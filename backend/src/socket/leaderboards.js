const { LEADERBOARDS } = require('./actions');
const UserSummary = require('../database/userSummary');
const { mkUserRoom } = require('./util');

const attachLeaderboards = (io, socket, pool) => {

    // GET LEADER BOARDS
    socket.on(LEADERBOARDS.LIST, async (userId) => {
        if (userId) {
            const data = await UserSummary.listTop5(pool);
            io.to(mkUserRoom(userId)).emit(LEADERBOARDS.LIST, data.rows);
        }
    });

};

module.exports = attachLeaderboards;