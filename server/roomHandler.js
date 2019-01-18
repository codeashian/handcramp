const roomHandler = (socket, io) => {
	const createRoom = () => {
		const roomId = (Math.random() * 100000) | 0;

		socket.emit("roomCreated", {
			roomId,
			player: {
				id: socket.id
			}
		});
	};

	const joinRoom = roomId => {
		const socketRoom = io.sockets.adapter.rooms[roomId];

		if (
			socketRoom != undefined &&
			Object.keys(socketRoom.sockets).length >= 2
		) {
			socket.emitToSelf("roomIsFull");
			return;
		}

		socket.join(roomId);
		socket.player = {
			hand: "",
			score: 0,
			id: socket.id
		};

		socket.emitToOthers("playerJoinedRoom", roomId);
		socket.emitToSelf("roomJoined", {
			id: socket.id
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
