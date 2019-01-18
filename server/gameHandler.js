const checkWinner = require("./functions/checkWinner");

const gameHandler = client => {
	const selectHand = (hand, roomId) => {
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

	const reset = roomId => {
		const players = client.getPlayersInRoom(roomId);
		if (players) {
			this.players = players.map(player => {
				player.hand = "";
				return player;
			});
		}
	};

	const play = roomId => {
		let players = client.getPlayersInRoom(roomId);
		const winnerId = checkWinner(players);
		if (winnerId) {
			players = players.map(player => {
				if (player.id === winnerId) {
					player.score = player.score + 1;
				}
				return player;
			});
		}

		// setTimeout(() => {
		client.emitToAll("play", roomId, {
			winnerId,
			players
		});
		// }, 3000);
	};

	return {
		play,
		selectHand,
		reset
	};
};

module.exports = gameHandler;
