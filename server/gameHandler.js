const checkWinner = require("./functions/checkWinner");

const gameHandler = (client, io) => {
	const handleGameMode = (roomId, gameMode) => {
		if (gameMode === "bestofthree") {
			const players = client.getPlayersInRoom(roomId);
			const winner = players.filter(item => item.score === 2);

			let response = {
				players: client.getPlayersInRoom(roomId),
				winnerId: "",
				round: client.player.round
			};

			if (winner.length) {
				client.emitToSelf("onGameEnd", {
					winnerId: winner[0].id,
					players: client.getPlayersInRoom(roomId),
					gameEnd: true
				});
			} else {
				client.emitToSelf("onRoundEnd", response);
			}

			if (!client.player) {
				return;
			}
		}
	};

	const resetHands = roomId => {
		const players = client.getPlayersInRoom(roomId);

		if (players[0] && players[1]) {
			if (players[0].hand && players[1].hand) {
				players[0].hand = "";
				players[1].hand = "";
			}
		}
	};

	const resetScore = roomId => {
		const players = client.getPlayersInRoom(roomId);

		players.forEach(player => {
			player.score = 0;
		});
	};

	const addScore = roomId => {
		const players = client.getPlayersInRoom(roomId);

		if (players[0] && players[1]) {
			if (players[0].hand && players[1].hand) {
				const roundWinner = checkWinner(players);

				players.forEach(player => {
					if (player.id === roundWinner) {
						player.score = player.score + 1;
					}
				});
			}
		}
	};

	const selectHand = (hand, roomId, id) => {
		const socket = client.getPlayerById(id);
		const players = client.getPlayersInRoom(roomId);

		if (!players) {
			client.emitToSelf("onError", "timeout");
		}
		resetHands(roomId);

		if (socket) {
			socket.player.hand = hand;
		}

		addScore(roomId);

		if (!client.player) {
			client.emitToSelf("onError", "error");
			return;
		}

		client.emitToAll("handSelected", roomId, players);

		if (Object.keys(players).length === 2) {
			if (players[0].hand && players[1].hand) {
				play(roomId);
			}
		}
	};

	const play = roomId => {
		const players = client.getPlayersInRoom(roomId);

		if (!players || !client.player) {
			return;
		}

		setTimeout(() => {
			client.emitToAll("play", roomId, players);
		}, 2000);
	};

	const roundEnd = (roomId, userId) => {
		const players = client.getPlayersInRoom(roomId);
		const roundWinner = checkWinner(players);
		const room = client.getRoom(roomId);

		if (!players && !client.player) {
			return;
		}

		if (roundWinner !== "draw") {
			client.player.round = client.player.round + 1;
		}

		if (room.gameMode) {
			handleGameMode(roomId, room.gameMode, userId);
			return;
		}

		client.emitToSelf("onGameEnd", {
			players: client.getPlayersInRoom(roomId),
			round: client.player.round,
			winnerId: roundWinner,
			gameEnd: true
		});
	};

	const replay = roomId => {
		const room = client.getRoom(roomId);

		if (room.gameMode) {
			client.player.round = 1;
			resetScore(roomId);
		}

		resetHands(roomId);

		client.emitToSelf("onReplay", {
			gameEnd: false,
			winnerId: "",
			players: client.getPlayersInRoom(roomId),
			round: client.player.round
		});
	};

	return {
		play,
		selectHand,
		replay,
		roundEnd
	};
};

module.exports = gameHandler;
