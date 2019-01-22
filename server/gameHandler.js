const checkWinner = require("./functions/checkWinner");

const gameHandler = client => {
	const handleGameMode = (roomId, gameMode) => {
		if (gameMode === "bestofthree") {
			const players = client.getPlayersInRoom(roomId);

			if (!players || !client.player) {
				return;
			}
			const [player1, player2] = players;
			const winnerId = player1.score < player2.score ? player2.id : player1.id;
			const continueGame = client.player.round <= 3;

			let response = {
				players,
				gameEnd: !continueGame,
				winnerId: !continueGame && winnerId,
				round: client.player.round
			};

			client.emitToAll("result", response);
		}
	};

	const selectHand = (hand, roomId) => {
		if (!client.player) {
			client.emitToSelf("onError", "error");
			return;
		}
		client.player.hand = hand;
		const players = client.getPlayersInRoom(roomId);

		client.emitToAll("handSelected", roomId, players);
		let shouldPlay = true;

		if (Object.keys(players).length > 1) {
			for (let player of players) {
				if (!player.hand) {
					shouldPlay = false;
					break;
				}
			}
			if (shouldPlay) {
				play(roomId);
			}
		}
	};

	const play = roomId => {
		const players = client.getPlayersInRoom(roomId);
		client.emitToAll("play", players);
	};

	const roundEnd = roomId => {
		const players = client.getPlayersInRoom(roomId);
		const room = client.getRoom(roomId);
		const roundWinner = checkWinner(players);

		if (!roundWinner === "draw") {
			client.players.round += 1;
		}

		if (room.gameMode) {
			handleGameMode(roomId, room.gameMode);
			return;
		}

		client.player.hand = "";

		client.emitToAll("result", {
			players,
			round: client.player.round,
			winnerId: roundWinner,
			gameEnd: true
		});
	};

	const replay = roomId => {
		const room = client.getRoom(roomId);
		const players = client.getPlayersInRoom(roomId);

		if (room.gameMode) {
			client.player.round = 1;
		}

		client.player.hand = "";

		client.emitToSelf("replay", players);
	};

	// const replay = () => {
	// 	if (!client.player) {
	// 		client.emitToSelf("onError", "error");
	// 		return;
	// 	}
	// 	client.emitToSelf("replay");
	// };

	// const reset = roomId => {
	// 	const players = client.getPlayersInRoom(roomId);

	// 	if (!client.player) {
	// 		client.emitToSelf("onError", "error");
	// 		return;
	// 	}

	// 	if (players) {
	// 		this.players = players.map(player => {
	// 			player.hand = "";
	// 			return player;
	// 		});
	// 	}
	// };

	// const play = roomId => {
	// 	let players = client.getPlayersInRoom(roomId);
	// 	const roundWinner = checkWinner(players);
	// 	const room = client.getRoom(roomId);
	// 	let winnerId = false;

	// 	if (!client.player) {
	// 		client.emitToSelf("onError", "error");
	// 		return;
	// 	}

	// 	if (roundWinner) {
	// 		players = players.map(player => {
	// 			if (player.id === roundWinner) {
	// 				player.score = player.score + 1;
	// 			}
	// 			return player;
	// 		});
	// 	}

	// 	if (winnerId !== "draw") {
	// 		client.player.round = client.player.round + 1;
	// 	}

	// 	if (room.gameMode === "bestofthree") {
	// 		const [player1, player2] = players;
	// 		if (client.player.round === 3) {
	// 			winnerId = player1.score < player2.score ? player2.id : player1.id;
	// 			client.player.round = 3;
	// 		}
	// 	} else {
	// 		winnerId = roundWinner;
	// 	}

	// 	client.emitToAll("play", roomId, {
	// 		winnerId,
	// 		players,
	// 		round: client.player.round
	// 	});
	// };

	return {
		play,
		selectHand,
		replay,
		roundEnd
	};
};

module.exports = gameHandler;
