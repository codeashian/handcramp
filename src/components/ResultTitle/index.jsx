import React from "react";
import PropTypes from "prop-types";

import H1 from "components/H1";
import ResultTitleStyled from "./ResultTitleStyled";
import getResult from "../../helpers/getResult";
import H5 from "../H5/index";

const ResultTitle = ({ winnerId, userId, userValue, opponentValue, show }) => {
	const result = getResult(winnerId, userId);
	const texts = {
		win: "YOU WIN!",
		lose: "YOU LOSE!",
		draw: "IT'S A TIE!"
	};

	const outputs = [
		["scissors-paper", "scissors cuts paper"],
		["paper-rock", "paper covers rock"],
		["rock-scissors", "rock smashes scissors"]
	];

	let subtext = outputs
		.filter(item => {
			return item[0].includes(opponentValue) && item[0].includes(userValue)
				? true
				: false;
		})
		.map(item => item[1]);

	return (
		<ResultTitleStyled show={show}>
			<H5> {opponentValue !== userValue && subtext[0]} </H5>
			<H1> {texts[result]} </H1>
		</ResultTitleStyled>
	);
};

ResultTitle.propTypes = {
	winnerId: PropTypes.string,
	userId: PropTypes.string,
	userValue: PropTypes.string,
	opponentValue: PropTypes.string
};

ResultTitle.defaultProps = {
	// target: '_self'
};

export default ResultTitle;
