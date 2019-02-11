import React from "react";
import PropTypes from "prop-types";
import H5 from "components/H5";
import GameHeaderStyled, { Score } from "./GameHeaderStyled";
import Paragraph from "../Paragraph/index";

const GameHeader = props => (
	<GameHeaderStyled {...props}>
		<div>
			{console.log(props)}
			<Paragraph> You</Paragraph>
			<Score pos="left" score={props.userScore}>
				{props.userScore}
			</Score>
		</div>
		{props.gameMode === "bestofthree" ? (
			<div className="GameHeader-RoundBox">
				<H5> Round </H5>
				<span>{props.rounds} / 3</span>
			</div>
		) : (
			<div>
				<H5> Round {props.rounds} </H5>
			</div>
		)}
		<div>
			<Paragraph>{props.opponent}</Paragraph>
			<Score pos="right" score={props.opponentScore}>
				{props.opponentScore}
			</Score>
		</div>
	</GameHeaderStyled>
);

GameHeader.propTypes = {
	rounds: PropTypes.number,
	opponentScore: PropTypes.number,
	userScore: PropTypes.number,
	gameMode: PropTypes.string,
	opponent: PropTypes.string
};

GameHeader.defaultProps = {
	// target: '_self'
	gameMode: ""
};

export default GameHeader;
