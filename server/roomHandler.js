const roomHandler = (socket, io) => {
	const createRoom = options => {
		const roomId = (Math.random() * 100000) | 0;

		socket.emit("roomCreated", {
			roomId,
			player: {
				id: socket.id
			}
		});
	};

	const joinRoom = (roomId, gameMode = false) => {
		const socketRoom = io.sockets.adapter.rooms[roomId];

		if (
			socketRoom != undefined &&
			Object.keys(socketRoom.sockets).length >= 2
		) {
			socket.emitToSelf("roomIsFull");
			return;
		}

		socket.player = {
			hand: "",
			score: 0,
			id: socket.id
		};

		socket.join(roomId);
		const room = io.sockets.adapter.rooms[roomId];

		if (gameMode) {
			room.gameMode = gameMode;
		}

		socket.emitToOthers("playerJoinedRoom", roomId);

		socket.emitToSelf("roomJoined", {
			id: socket.id,
			gameMode: socket.getRoomMode(roomId)
		});
	};

	const disconnecting = () => {
		socket.emitToOthers("playerDisconnected");
	};

	return {
		createRoom,
		joinRoom,
		disconnecting
	};
};

module.exports = roomHandler;
