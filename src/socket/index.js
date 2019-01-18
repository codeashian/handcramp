import io from "socket.io-client";

export default () => {
	const host =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: window.location.host;

	const socket = io(host);

	const roomCreated = cb => {
		socket.on("roomCreated", cb);
	};

	const createRoom = () => {
		socket.emit("createRoom");
	};

	const joinRoom = (roomId, gameMode) => {
		socket.emit("joinRoom", roomId, gameMode);
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
		socket.emit("selectHand", value, roomId);
	};

	const handSelected = cb => {
		socket.on("handSelected", cb);
	};

	const play = cb => {
		socket.on("play", cb);
	};

	const reset = roomId => {
		socket.emit("reset", roomId);
	};

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
		reset
		// join,
		// opponentJoined,
		// joined,
		// onHandSelect,
		// selectHand,
		// maxPlayers,
		// opponentDisconnected
	};
};
