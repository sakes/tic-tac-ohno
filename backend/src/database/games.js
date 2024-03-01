const GAMES = require('./scripts/games');

const Games = {
    /**
     * READ
     */
    isInGame: async (pool, username) => {
        const res = await pool.query(GAMES.EXISTS, [username]);
        const exists = !!res.rows[0]?.exists;
        return exists;
    },

    get: async (pool, gameId, myUsername) => {
        const script = gameId ? GAMES.GET : GAMES.GET_MY_CURRENT_GAME;
        const params = gameId ? [gameId] : [myUsername];
        const res = await pool.query(script, params);
        const game = res.rows[0];
        return game;
    },

    list: async (pool, limit = 10) => {
        const script = limit ? GAMES.LIST_W_LIMIT : GAMES.LIST;
        const params = limit ? [limit] : [];
        const res = await pool.query(script, params);
        const game = res.rows;
        return game;
    },

    listOpenGames: async (pool, limit = 10) => {
        const script = limit ? GAMES.LIST_OPEN_GAMES : GAMES.LIST_OPEN_GAMES_W_LIMIT;
        const params = limit ? [limit] : [];
        const res = await pool.query(script, params);
        const game = res.rows;
        return game;
    },

    /**
     * WRITE
     */
    insert: async (pool, ownerUserId) => {
        const res = await pool.query(GAMES.INSERT, [ownerUserId]);
        console.log(JSON.stringify(res));
        return res.rows[0].id;
    },

    update: async (pool, gameId, ownerUserId, opponentUserId, moves, winnerUserId, completed) => {
        const res = await pool.query(GAMES.UPDATE, [gameId, ownerUserId, opponentUserId, moves, winnerUserId, completed]);
        console.log(JSON.stringify(res));
        return true;
    },

    updateOpponent: async (pool, gameId, opponentUserId) => {
        const res = await pool.query(GAMES.UPDATE_OPPONENT, [gameId, opponentUserId]);
        console.log(JSON.stringify(res));
        return true;
    },

    updateMoves: async (pool, gameId, moves) => {
        const res = await pool.query(GAMES.UPDATE_MOVES, [gameId, moves]);
        console.log(JSON.stringify(res));
        return true;
    },

    updateWinner: async (pool, gameId, winnerUserId) => {
        const res = await pool.query(GAMES.UPDATE_WINNER, [gameId, winnerUserId]);
        console.log(JSON.stringify(res));
        return true;
    },

    /**
     * DELETE
     */
    delete: async (pool, { id }) => {
        const res = await pool.query(GAMES.DELETE, [id]);
        console.log(JSON.stringify(res));
        return true;
    }

}

export default Games;