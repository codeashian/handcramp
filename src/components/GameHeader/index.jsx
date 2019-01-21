import React from "react";
import PropTypes from "prop-types";
import H5 from "components/H5";
import GameHeaderStyled, { Score } from "./GameHeaderStyled";
import { animation, Transition } from "react-spring";

const GameHeader = props => (
	<GameHeaderStyled {...props}>
		<div>
			<H5> You</H5>
			<p> {props.userScore} </p>
		</div>
		{props.gameMode === "bestofthree" ? (
			<div className="GameHeader-RoundBox">
				<H5> Round </H5>
				<span>{props.rounds} / 3</span>
			</div>
		) : (
			<div>
				<H5> Round {props.rounds} / 3 </H5>
			</div>
		)}
		<div>
			<H5>Opponent</H5>
			<Score score={props.opponentScore}> {props.opponentScore} </Score>
		</div>
	</GameHeaderStyled>
);

GameHeader.propTypes = {
	rounds: PropTypes.number,
	opponentScore: PropTypes.number,
	userScore: PropTypes.number,
	gameMode: PropTypes.string
};

GameHeader.defaultProps = {
	// target: '_self'
	gameMode: "bestofthree"
};

export default GameHeader;
