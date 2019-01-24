const checkWinner = players => {
	const winSheet = {
		rock: "scissors",
		paper: "rock",
		scissors: "paper"
	};

	console.log(players[0].hand, players[1].hand);
	if (!players[0] || !players[1]) {
		return;
	}
	const player1 = players[0];
	const player2 = players[1];

	if (player1.hand === player2.hand) {
		return "draw";
	}

	if (winSheet[player1.hand] === player2.hand) {
		return player1.id;
	}

	return player2.id;
};

module.exports = checkWinner;
