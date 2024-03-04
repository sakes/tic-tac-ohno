const USER_SUMMARY = require('./scripts/user_summary');

const UserSummary = {
    /**
     * READ
     */
    exists: async (pool, username) => {
        const res = await pool.query(USER_SUMMARY.EXISTS, [username]);
        const exists = !!res.rows[0]?.exists;
        return exists;
    },

    get: async (pool, { id, username }) => {
        const script = id ? USER_SUMMARY.GET : USER_SUMMARY.GET_BY_USERNAME;
        const params = id ? [id] : [username];
        const res = await pool.query(script, params);
        const user_summary = res.rows[0];
        return user_summary;
    },

    list: async (pool, limit = 10) => {
        const script = !!limit ? USER_SUMMARY.LIST_W_LIMIT : USER_SUMMARY.LIST;
        const params = !!limit ? [limit] : [];
        const res = await pool.query(script, params);
        const user_summaries = res.rows;
        return user_summaries;
    },

    listTop5: async (pool) => {
        return UserSummary.list(pool, 5);
    },

    /**
     * WRITE
     */
    insert: async (pool, username) => {
        const res = await pool.query(USER_SUMMARY.INSERT_BY_USERNAME, [username]);
        return {
            id: res.rows[0].id,
            username
        }
    },

    update: async (pool, { id, username }) => {
        const res = await pool.query(USER_SUMMARY.UPDATE, [id, username]);
        return true;
    },

    /**
     * INCREMENT
     */

    incWins: async (pool, { id, username }) => {
        const script = id ? USER_SUMMARY.INC_WINS : USER_SUMMARY.INC_WINS_BY_USERNAME;
        const params = id ? [id] : [username];
        await pool.query(script, params);
        return true;
    },

    incLosses: async (pool, { id, username }) => {
        const script = id ? USER_SUMMARY.INC_LOSSES : USER_SUMMARY.INC_LOSSES_BY_USERNAME;
        const params = id ? [id] : [username];
        await pool.query(script, params);
        return true;
    },

    incTies: async (pool, { id, username }) => {
        const script = id ? USER_SUMMARY.INC_TIES : USER_SUMMARY.INC_TIES_BY_USERNAME;
        const params = id ? [id] : [username];
        await pool.query(script, params);
        return true;
    },
    

    /**
     * DELETE
     */
    delete: async (pool, { id }) => {
        const res = await pool.query(USER_SUMMARY.DELETE, [id]);
        return true;
    }

}

module.exports = UserSummary;