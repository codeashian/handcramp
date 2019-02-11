const roomHandler = (socket, io) => {
	this.room = "";
	let CURRENT_ROOM = "";
	const createRoom = options => {
		const roomId = (Math.random() * 100000) | 0;
		socket.emit("roomCreated", {
			roomId,
			player: {
				id: socket.id
			}
		});
	};

	const createPlayer = () => {
		return {
			hand: "",
			score: 0,
			id: socket.id,
			round: 1
		};
	};

	const joinRoomComputer = () => {
		socket.emitToSelf("roomJoined", {
			id: "user"
		});
	};

	const joinRoom = (roomId, gameMode = false) => {
		let socketRoom = socket.getRoom(roomId);
		// check if room is available
		CURRENT_ROOM = roomId;

		if (
			socketRoom != undefined &&
			Object.keys(socketRoom.sockets).length >= 2
		) {
			socket.emitToSelf("onError", "roomFull");
			return;
		}

		socket.player = createPlayer();
		socket.join(roomId);
		if (gameMode) {
			socket.setGameMode(roomId, gameMode);
		} else {
			const room = socket.getRoom(roomId);
			socket.setGameMode(roomId, room.gameMode);
		}

		socket.emitToOthers("playerJoinedRoom", roomId);

		socket.emitToSelf("roomJoined", {
			id: socket.id,
			room: socket.getRoom(roomId)
		});
	};

	const error = message => {
		socket.emitToAll("onError", CURRENT_ROOM, message);
	};

	return {
		createRoom,
		joinRoom,
		joinRoomComputer,
		error
	};
};

module.exports = roomHandler;
