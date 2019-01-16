const shouldWin = (user, opponent) => {
	const results = ["win", "draw", "lose"];
	const winSheet = {
		rock: "scissors",
		paper: "rock",
		scissors: "paper"
	};

	if (opponent === user) {
		return results[1];
	}

	if (winSheet[user] === opponent) {
		return results[0];
	}

	return results[2];
};

export default shouldWin;
