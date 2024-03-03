const isInRoom = (socket, room) => {
    return socket?.rooms && socket.rooms.has(room);
};

const mkUserRoom = (userId) => `userId:${userId}`;

const mkGameRoom = (gameId) => `gameId:${gameId}`;

module.exports = {
    isInRoom,
    mkUserRoom,
    mkGameRoom
}