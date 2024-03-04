const { GAME, GAMES } = require('./actions');
const Games = require('../database/games');
const { mkGameRoom, mkUserRoom } = require('./util');

const attachGames = (io, socket, pool) => {

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
            const game = await Games.get(pool, gameId);
            socket.join(gameRoom);
            io.to(gameRoom).emit(GAME.REFRESH, game);

            // UPDATE PUBLIC GAME LIST
            const games = await Games.listOpenGames(pool, 20);
            io.emit(GAMES.LIST, games);
        }
    });

    // GET CURRENT GAME
    socket.on(GAME.GET, async (userId) => {
        if (userId) {
            const game = await Games.getMyCurrentGame(pool, { id: userId });
            io.to(mkUserRoom(userId)).emit(GAME.REFRESH, game);
        }
    });

    // FORFIT GAME
    socket.on(GAME.FORFIT, async(gameId, userId) => {
        if (userId) {
            console.log('*********')
            console.log('BEGIN')
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

            // Send Players to their next games if any
            await Promise.all(players.map((pId) => {
                return (async () => {
                    console.log(`send {${pId}} to next game`);
                    const nextGame = await Games.getMyCurrentGame(pool, { id: pId });
                    console.log(`next gameid: ${nextGame?.id}`);
                    io.to(mkUserRoom(pId)).emit(GAME.REFRESH, nextGame || null);
                })();
            }))

            // update global games list for all users
            const games = await Games.listOpenGames(pool, 20);
            io.emit(GAMES.LIST, games);


            console.log('*********')
            console.log('END')
            console.log('*********')
        }

    })


    // COMPLETE
    socket.on(GAME.COMPLETE, async(gameId) => {
        if (userId) {
            console.log('*********')
            console.log('BEGIN')
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
                    const nextGame = await Games.getMyCurrentGame(pool, { id: pId });
                    console.log(`next gameid: ${nextGame?.id}`);
                    io.to(mkUserRoom(pId)).emit(GAME.REFRESH, nextGame || null);
                })();
            }))

            // update global games list for all users
            const games = await Games.listOpenGames(pool, 20);
            io.emit(GAMES.LIST, games);


            console.log('*********')
            console.log('END')
            console.log('*********')
        }

    })

};

module.exports = attachGames;