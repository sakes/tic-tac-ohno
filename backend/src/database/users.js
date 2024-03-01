const USERS = require('./scripts/users');

const Users = {
    /**
     * READ
     */
    exists: async (pool, username) => {
        const res = await pool.query(USERS.EXISTS, [username]);
        const exists = !!res.rows[0]?.exists;
        return exists;
    },

    get: async (pool, { id, username }) => {
        const script = id ? USERS.GET : USERS.GET_BY_USERNAME;
        const params = id ? [id] : [username];
        const res = await pool.query(script, params);
        const user = res.rows[0];
        return user;
    },

    list: async (pool, limit = 10) => {
        const script = limit ? USERS.LIST_W_LIMIT : USERS.LIST;
        const params = limit ? [limit] : [];
        const res = await pool.query(script, params);
        const user = res.rows;
        return user;
    },

    /**
     * WRITE
     */
    insert: async (pool, username) => {
        const res = await pool.query(USERS.INSERT, [username]);
        console.log(JSON.stringify(res));
        return {
            id: res.rows[0].id,
            username
        }
    },

    update: async (pool, { id, username }) => {
        const res = await pool.query(USERS.UPDATE, [id, username]);
        console.log(JSON.stringify(res));
        return true;
    },

    /**
     * DELETE
     */
    delete: async (pool, { id }) => {
        const res = await pool.query(USERS.DELETE, [id]);
        console.log(JSON.stringify(res));
        return true;
    }

}

export default Users;