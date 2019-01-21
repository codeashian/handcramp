const checkWinner = require("./functions/checkWinner");

const gameHandler = client => {
	const selectHand = (hand, roomId) => {
		if (!client.player) {
			client.emitToSelf("onError", "error");
			return;
		}
		client.player.hand = hand || "";
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

	const replay = () => {
		if (!client.player) {
			client.emitToSelf("onError", "error");
			return;
		}
		client.emitToSelf("replay");
	};

	const reset = roomId => {
		const players = client.getPlayersInRoom(roomId);

		if (!client.player) {
			client.emitToSelf("onError", "error");
			return;
		}

		if (players) {
			this.players = players.map(player => {
				player.hand = "";
				return player;
			});
		}
	};

	const play = roomId => {
		let players = client.getPlayersInRoom(roomId);
		const roundWinner = checkWinner(players);
		const room = client.getRoom(roomId);
		let winnerId = false;

		if (!client.player) {
			client.emitToSelf("onError", "error");
			return;
		}

		if (roundWinner) {
			players = players.map(player => {
				if (player.id === roundWinner) {
					player.score = player.score + 1;
				}
				return player;
			});
		}

		if (winnerId !== "draw") {
			client.player.round = client.player.round + 1;
		}

		if (room.gameMode === "bestofthree") {
			const [player1, player2] = players;
			if (client.player.round === 3) {
				winnerId = player1.score < player2.score ? player2.id : player1.id;
				client.player.round = 3;
			}
		} else {
			winnerId = roundWinner;
		}

		console.log("PLAY", client.player.round);
		client.emitToAll("play", roomId, {
			winnerId,
			players,
			round: client.player.round
		});
	};

	return {
		play,
		selectHand,
		reset,
		replay
	};
};

module.exports = gameHandler;
