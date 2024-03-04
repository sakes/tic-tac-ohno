const UserSummary = require('../database/userSummary');
const { USER } = require('./actions');
const { isInRoom, mkUserRoom } = require('./util');

const attachUser = (io, socket, pool) => {
    // REGISTER
    socket.on(USER.REGISTER, async (userId) => {
        const rm = mkUserRoom(userId);
        if (userId && !isInRoom(socket, rm)) {
            socket.join(rm);
            const userSummary = await UserSummary.get(pool, { id: userId });
            io.to(rm).emit(USER.GET_SUMMARY, userSummary);
        }
    });

    // UNREGISTER
    socket.on(USER.UNREGISTER, async (userId) => {
        if (userId) {
            socket.leave(mkUserRoom(userId));
        }
    });

    // SUMMARY
    socket.on(USER.GET_SUMMARY, async (userId) => {
        const rm = mkUserRoom(userId);
        if (userId) {
            const userSummary = await UserSummary.get(pool, { id: userId });
            io.to(rm).emit(USER.GET_SUMMARY, userSummary);
        }        
    })
};

module.exports = attachUser;