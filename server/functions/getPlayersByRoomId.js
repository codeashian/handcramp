const getPlayersByRoomId = (io, roomId) => {
	const connectedUsers = io.sockets.adapter.rooms[roomId].sockets;
	const players = Object.keys(connectedUsers).map(id => {
		return io.sockets.connected[id].player;
	});

	return players;
};

module.exports = getPlayersByRoomId;
