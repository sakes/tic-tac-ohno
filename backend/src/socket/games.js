const { GAME, GAMES } = require('./actions');
const Games = require('../database/games');
const { mkGameRoom, mkUserRoom } = require('./util');

const attachGames = (io, socket, pool) => {

    // LIST GAMES
    socket.on(GAMES.LIST, async (userId) => {
        if (userId) {
            const data = await Games.list(pool);
            io.to(mkUserRoom(userId)).emit(GAMES.LIST, data.rows);
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
            const games = await Games.list(pool, 20);
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
            const games = await Games.list(pool, 20);
            io.emit(GAMES.LIST, games);
        }
    });

};

module.exports = attachGames;