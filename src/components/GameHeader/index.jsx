import React from "react";
import PropTypes from "prop-types";
import H4 from "components/H4";
import GameHeaderStyled from "./GameHeaderStyled";

const GameHeader = props => (
	<GameHeaderStyled {...props}>
		<div>
			<H4> You</H4>
			<p> {props.userScore} </p>
		</div>
		<div>
			<H4> Round {props.rounds} </H4>
		</div>
		<div>
			<H4>Opponent</H4>
			<p> {props.opponentScore} </p>
		</div>
	</GameHeaderStyled>
);

GameHeader.propTypes = {
	rounds: PropTypes.number,
	opponentScore: PropTypes.number,
	userScore: PropTypes.number
};

GameHeader.defaultProps = {
	// target: '_self'
};

export default GameHeader;
