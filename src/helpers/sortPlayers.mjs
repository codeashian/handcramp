const sortPlayers = (players, id) => {
	return players.reduce(
		(acc, item) => {
			item.id === id ? (acc.user = item) : (acc.opponent = item);
			return acc;
		},
		{ user: {}, opponent: {} }
	);
};

export default sortPlayers;
