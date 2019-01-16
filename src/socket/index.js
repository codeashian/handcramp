import io from "socket.io-client";

export default () => {
	const socket = io.connect("http://" + window.location.hostname + ":8080");

	const roomCreated = cb => {
		socket.on("roomCreated", cb);
	};

	const createRoom = () => {
		socket.emit("createRoom");
	};

	const joinRoom = roomId => {
		socket.emit("joinRoom", roomId);
	};

	const roomJoined = cb => {
		socket.on("roomJoined", cb);
	};

	const leaveRoom = roomId => {
		socket.emit("leaveRoom", roomId);
	};

	const roomIsFull = cb => {
		socket.on("roomIsFull", cb);
	};

	const error = cb => {
		socket.on("onError", cb);
	};

	const playerDisconnected = cb => {
		socket.on("playerDisconnected", cb);
	};

	const playerJoinedRoom = cb => {
		socket.on("playerJoinedRoom", cb);
	};

	const selectHand = (value, roomId) => {
		console.log("He");
		socket.emit("selectHand", value, roomId);
	};

	const handSelected = cb => {
		socket.on("handSelected", cb);
	};

	const play = cb => {
		socket.on("play", cb);
	};

	const replay = () => {
		socket.emit("replay");
	};

	// const join = room => {
	// 	socket.emit("joinRoom", room);
	// };

	// const opponentJoined = cb => {
	// 	socket.on("userJoinedRoom", cb);
	// };

	// const joined = cb => {
	// 	socket.on("joined", cb);
	// };

	// const onHandSelect = cb => {
	// 	socket.on("handleSelectHand", cb);
	// };

	// const selectHand = value => {
	// 	socket.emit("selectHand", value);
	// };

	// const maxPlayers = cb => {
	// 	socket.on("maxPlayers", cb);
	// };

	// const opponentDisconnected = cb => {
	// 	socket.on("opponentDisconnected", cb);
	// };

	return {
		roomCreated,
		createRoom,

		joinRoom,
		roomJoined,
		roomIsFull,
		leaveRoom,

		error,
		playerDisconnected,

		playerJoinedRoom,
		selectHand,
		handSelected,
		play,
		replay
		// join,
		// opponentJoined,
		// joined,
		// onHandSelect,
		// selectHand,
		// maxPlayers,
		// opponentDisconnected
	};
};
