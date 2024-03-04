const USERS = require('./scripts/users');
const UserSummary = require('./userSummary');

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
        return {
            id: res.rows[0].id,
            username
        }
    },

    update: async (pool, { id, username }) => {
        const res = await pool.query(USERS.UPDATE, [id, username]);
        return true;
    },

    /**
     * DELETE
     */
    delete: async (pool, { id }) => {
        const res = await pool.query(USERS.DELETE, [id]);
        return true;
    },

    /**
     * SPECIAL
     */

    login: async(pool, username) => {
        console.log(`login: ${username}`);
        let user;
        const exists = await Users.exists(pool, username);
        console.log(`login: exists:${username}: ${exists}`);

        if (exists) {
            console.log(`login: get:${username}`);
            user = await Users.get(pool, { username });
            console.log(user);
            return user;
        }

        console.log(`login: insert:${username}`);
        user = await Users.insert(pool, username);
        await UserSummary.insert(pool, username);
        return user;
    }
}

module.exports = Users;