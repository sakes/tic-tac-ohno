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

    get: async (pool, gameId) => {
        const res = await pool.query(GAMES.GET, [gameId]);
        const game = res.rows[0] || null;
        return game;
    },

    list: async (pool, limit = 10) => {
        const script = limit ? GAMES.LIST_W_LIMIT : GAMES.LIST;
        const params = limit ? [limit] : [];
        const res = await pool.query(script, params);
        const games = res.rows;
        return games;
    },

    listOpenGames: async (pool, limit = 10) => {
        const script = limit ? GAMES.LIST_OPEN_GAMES_W_LIMIT: GAMES.LIST_OPEN_GAMES;
        const params = limit ? [limit] : [];
        const res = await pool.query(script, params);
        const game = res.rows;
        return game;
    },

    getMyCurrentGame: async (pool, { id, username}) => {
        const script = id ? GAMES.GET_MY_CURRENT_GAME : GAMES.GET_MY_CURRENT_GAME_BY_USERNAME;
        const params = id ? [id] : [username];
        const res = await pool.query(script, params);
        const game = res.rows[0] || null;
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

    update: async (pool, gameId, ownerUserId, opponentUserId, board, winnerUserId, completed) => {
        const res = await pool.query(GAMES.UPDATE, [gameId, ownerUserId, opponentUserId, board, winnerUserId, completed]);
        console.log(JSON.stringify(res));
        return true;
    },

    updateOpponent: async (pool, gameId, opponentUserId) => {
        const res = await pool.query(GAMES.UPDATE_OPPONENT, [gameId, opponentUserId]);
        console.log(JSON.stringify(res));
        return true;
    },

    updateBoard: async (pool, gameId, board, winnerUserId, complete) => {
        const res = await pool.query(GAMES.UPDATE_BOARD, [gameId, JSON.stringify(board), (winnerUserId || null), (complete || false)]);
        console.log(JSON.stringify(res));
        return true;
    },

    updateWinner: async (pool, gameId, winnerUserId) => {
        const res = await pool.query(GAMES.UPDATE_WINNER, [gameId, winnerUserId]);
        console.log(JSON.stringify(res));
        return true;
    },

    forceComplete: async (pool, gameId) => {
        const res = await pool.query(GAMES.UPDATE_COMPLETED, [gameId]);
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

module.exports = Games;