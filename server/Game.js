const checkWinner = require("./functions/checkWinner");
const getPlayersByRoomId = require("./functions/getPlayersByRoomId");

class Game {
	constructor() {
		console.log(this);
	}

	handleSelectHand(hand) {
		this.socket.player.hand = hand;
		this.players = getPlayersByRoomId(this.io, this.roomId);
		this.emitToAll("handSelected", this.players);
		let shouldPlay = true;

		if (Object.keys(this.players).length > 1) {
			for (let player of this.players) {
				if (!player.hand) {
					shouldPlay = false;
					break;
				}
			}
			if (shouldPlay) {
				this.play();
			}
		}
	}

	replay() {
		if (this.players) {
			this.players = this.players.map(player => {
				player.hand = "";
				return player;
			});
		}
	}

	play() {
		const winnerId = checkWinner(this.players);

		if (winnerId) {
			this.players = this.players.map(player => {
				if (player.id === winnerId) {
					player.score = player.score + 1;
				}
				return player;
			});
		}

		// setTimeout(() => {
		this.emitToAll("play", {
			winnerId,
			players: this.players
		});
		// }, 3000);
	}
}

module.exports = Game;
