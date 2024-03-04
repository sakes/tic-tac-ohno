const { GAME, GAMES, USER, LEADERBOARDS } = require('./actions');
const Games = require('../database/games');
const UserSummary = require('../database/userSummary');
const { mkGameRoom, mkUserRoom } = require('./util');
const { move, computeGameStatus, computeNextPlayerId, computeWinnerPlayerId } = require('./game.logic.util');



const attachGames = (io, socket, pool) => {
    const updateUserSummaries = async (game) => {
        const { completed, winner_user_id, owner_user_id, opponent_user_id } = game || {};
        let loser_user_id = null;
        if (completed && winner_user_id) {
            loser_user_id = winner_user_id === owner_user_id ? opponent_user_id : owner_user_id;
        }
        if (completed) {
            // TIED
            if (!winner_user_id && opponent_user_id) {
                await Promise.all([
                    UserSummary.incTies(pool, { id: owner_user_id }),
                    UserSummary.incTies(pool, { id: opponent_user_id })
                ]);
                const [ownerSummary, opponentSummary] = await Promise.all([
                    UserSummary.get(pool, {id: owner_user_id}),
                    UserSummary.get(pool, {id: loser_user_id}),
                ])
                io.to(mkUserRoom(owner_user_id)).emit(USER.GET_SUMMARY, ownerSummary);
                io.to(mkUserRoom(opponent_user_id)).emit(USER.GET_SUMMARY, opponentSummary);

            // CANCELLED
            } else if (!winner_user_id && opponent_user_id) {
                console.log('game canceled');
            
            // ASSUME WINNER
            } else if (winner_user_id && loser_user_id) {
                await Promise.all([
                    UserSummary.incWins(pool, { id: winner_user_id }),
                    UserSummary.incLosses(pool, { id: loser_user_id })
                ])
                const [winnerSummary, loserSummary ] = await Promise.all([
                    UserSummary.get(pool, {id: winner_user_id}),
                    UserSummary.get(pool, {id: loser_user_id}),
                ])
                io.to(mkUserRoom(winner_user_id)).emit(USER.GET_SUMMARY, winnerSummary);
                io.to(mkUserRoom(loser_user_id)).emit(USER.GET_SUMMARY, loserSummary);
            } else {
                throw new Error(`Socket updateUserSummaries(): somthing very strange happend with state.  State: completed: ${completed}, owner_user_id: ${owner_user_id}, opponent_user_id: ${opponent_user_id}, winner_user_id: ${winner_user_id}, loser_user_id: ${loser_user_id} `)
            }
        }

        return true;
    }


    // LIST GAMES
    socket.on(GAMES.LIST, async (userId) => {
        if (userId) {
            const games = await Games.listOpenGames(pool, 20);
            io.to(mkUserRoom(userId)).emit(GAMES.LIST, games);
        }
    });

    // CREATE
    socket.on(GAME.CREATE, async (userId) => {
        if (userId) {
            const gameId = await Games.insert(pool, userId);
            const gameRoom = mkGameRoom(gameId);
            const game = await Games.get(pool, gameId);
            socket.join(gameRoom);
            console.log('join game room on create');
            console.log(userId, gameRoom);
            io.to(gameRoom).emit(GAME.REFRESH, game);

            // UPDATE PUBLIC GAME LIST
            const games = await Games.listOpenGames(pool, 20);
            console.log('post create: list games');
            console.log(games);
            io.emit(GAMES.LIST, games);
        }
    });

    // JOIN
    socket.on(GAME.JOIN, async (gameId, userId) => {
        if (userId) {
            const gameRoom = mkGameRoom(gameId);
            await Games.updateOpponent(pool, gameId, userId);
            console.log('join game room on join');
            socket.join(gameRoom);
            console.log(userId, gameRoom);

            console.log('ATTEMPT TO UPDATE CLIENT GAME');
            const game = await Games.get(pool, gameId);
            const {
                nextPlayer
            } = computeGameStatus(game.board);
            
            // Determine player ids
            let nextPlayerId = computeNextPlayerId(nextPlayer, game?.owner_user_id, game?.opponent_user_id);

            io.to(gameRoom).emit(GAME.REFRESH, game, nextPlayerId);
            console.log({
                game,
                nextPlayerId
            })
            console.log('UPDATE CLIENT GAME COMPLETE');

            // UPDATE PUBLIC GAME LIST
            const games = await Games.listOpenGames(pool, 20);
            io.emit(GAMES.LIST, games);
        }
    });

    // GET CURRENT GAME
    socket.on(GAME.GET, async (userId) => {
        if (userId) {
            let nextPlayerId = undefined;
            const game = await Games.getMyCurrentGame(pool, { id: userId });
            if (game) {
                socket.join(mkGameRoom(game?.id));
                nextPlayerChar = computeGameStatus(game.board).nextPlayer;
                nextPlayerId = computeNextPlayerId(nextPlayerChar, game.owner_user_id, game.opponent_user_id);
            }
            io.to(mkUserRoom(userId)).emit(GAME.REFRESH, game, nextPlayerId);
        }
    });

    // FORFIT GAME
    socket.on(GAME.FORFIT, async(gameId, userId) => {
        if (userId) {
            console.log('*********')
            console.log('BEGIN FORFIT')
            console.log('*********')

            console.log(gameId, userId);

            // GET Game & Players
            const game = await Games.get(pool, gameId);
            console.log(`get game: `, game?.id);
            const players = [
                game.owner_user_id, 
                game.opponent_user_id
            ].filter(id => id); 

            // Update Winner
            const winner = players.filter(id => id !== userId)[0] || null;
            console.log(`update winner: ${winner}`);
            await Games.updateWinner(pool, gameId, winner);
            const finalGame = await Games.get(pool, gameId);
            if (finalGame?.completed && finalGame.opponent_user_id) {
                await updateUserSummaries(finalGame);

                const leaderboards = await UserSummary.listTop5(pool);
                io.emit(LEADERBOARDS.LIST, leaderboards);    
            } 

            // Send Players to their next games if any
            await Promise.all(players.map((pId) => {
                return (async () => {
                    console.log(`send {${pId}} to next game`);
                    let nextPlayerId;
                    const nextGame = await Games.getMyCurrentGame(pool, { id: pId });
                    if (nextGame) {
                        const {
                            nextPlayer
                        } = computeGameStatus(game.board);
                        nextPlayerId = computeNextPlayerId(nextPlayer, owner_user_id, opponent_user_id);
                    }
                    console.log(`next gameid: ${nextGame?.id}`);
                    io.to(mkUserRoom(pId)).emit(GAME.REFRESH, nextGame || null, nextPlayerId);
                })();
            }))

            // update global games list for all users
            const games = await Games.listOpenGames(pool, 20);
            io.emit(GAMES.LIST, games);


            console.log('*********')
            console.log('END FORFIT')
            console.log('*********')
        }
    });


    // COMPLETE
    socket.on(GAME.COMPLETE, async(gameId) => {
        if (gameId) {
            console.log('*********')
            console.log('BEGIN COMPLETE')
            console.log('*********')

            console.log(gameId);

            // GET Game & Players
            const game = await Games.get(pool, gameId);
            console.log(`get game: `, game?.id);
            const players = [
                game.owner_user_id,
                game.opponent_user_id
            ].filter(id => id); 

            // Force Complete
            await Games.forceComplete(pool, gameId);

            // Send Players to their next games if any
            await Promise.all(players.map((pId) => {
                return (async () => {
                    console.log(`send {${pId}} to next game`);
                    let nextPlayerId;
                    const nextGame = await Games.getMyCurrentGame(pool, { id: pId });
                    if (nextGame) {
                        const {
                            nextPlayer
                        } = computeGameStatus(game.board);
                        nextPlayerId = computeNextPlayerId(nextPlayer, owner_user_id, opponent_user_id);
                    }
                    console.log(`next gameid: ${nextGame?.id}`);
                    io.to(mkUserRoom(pId)).emit(GAME.REFRESH, nextGame || null, nextPlayerId);
                })();
            }))

            // update global games list for all users
            const games = await Games.listOpenGames(pool, 20);
            io.emit(GAMES.LIST, games);


            console.log('*********')
            console.log('END COMPLETE')
            console.log('*********')
        }
    });


    // MOVE
    socket.on(GAME.MOVE, async(gameId, userId, row, col) => {
        if (userId) {
            console.log('*********')
            console.log('BEGIN MOVE')
            console.log('*********')

            console.log(gameId);

            // GET Game
            const game = await Games.get(pool, gameId);
            const { id, board, owner_user_id, opponent_user_id } = game || {};
            if (!id) throw new Error(`Socket GAME.MOVE: Game not found. gameId: ${gameId}`);
            console.log(`get game: `, id);
            const player = userId === owner_user_id ? 'X' : 'O';


            // move
            move(board, player, row, col);
            const {
                nextPlayer,
                winner,
                complete
            } = computeGameStatus(board);
            
            // Determine player ids
            let nextPlayerId = computeNextPlayerId(nextPlayer, owner_user_id, opponent_user_id);
            let winnerUserId = computeWinnerPlayerId(winner, owner_user_id, opponent_user_id);

            // Update Game State
            await Games.updateBoard(pool, gameId, board, (winnerUserId || null), complete);

            // Update active game in client for players
            const gameNext = await Games.get(pool, gameId);
            io.to(mkGameRoom(gameId)).emit(GAME.REFRESH, gameNext, nextPlayerId);

            if (gameNext?.completed) {
                await updateUserSummaries(gameNext);

                const leaderboards = await UserSummary.listTop5(pool);
                io.emit(LEADERBOARDS.LIST, leaderboards);    
            }

            // update global games list for all users
            const games = await Games.listOpenGames(pool, 20);
            io.emit(GAMES.LIST, games);


            console.log('*********')
            console.log('END')
            console.log('*********')
        }
    });
};

module.exports = attachGames;