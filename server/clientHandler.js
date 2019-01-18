const client = (socket, io) => {
	socket.emitToOthers = (event, room, data = {}) => {
		socket.broadcast.to(room).emit(event, data);
	};

	socket.emitToAll = (event, room, data = {}) => {
		io.in(room).emit(event, data);
	};

	socket.emitToSelf = (event, data = {}) => {
		socket.emit(event, data);
	};

	socket.getPlayersInRoom = roomId => {
		const connectedUsers = io.sockets.adapter.rooms[roomId].sockets;
		return Object.keys(connectedUsers).map(id => {
			return io.sockets.connected[id].player;
		});
	};

	return socket;
};

module.exports = client;
