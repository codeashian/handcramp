const getResult = (winnerId, userId) => {
	let result = "";

	if (winnerId) {
		if (winnerId === "draw") {
			result = "draw";
		} else if (winnerId === userId) {
			result = "win";
		} else {
			result = "lose";
		}
	}

	return result;
};

export default getResult;
