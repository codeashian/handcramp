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

	socket.getPlayerById = id => {
		return io.sockets.connected[id];
	};

	socket.getRoomMode = roomId => {
		const room = io.sockets.adapter.rooms[roomId];
		return room.gameMode;
	};

	socket.setGameMode = (roomId, gameMode) => {
		const room = io.sockets.adapter.rooms[roomId];
		if (gameMode) {
			room.gameMode = gameMode;
		}
	};

	socket.setGameRounds = (roomId, value) => {
		const room = io.sockets.adapter.rooms[roomId];
		room.rounds = value;
	};

	socket.getRoom = roomId => {
		return io.sockets.adapter.rooms[roomId];
	};

	return socket;
};

module.exports = client;
