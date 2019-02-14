import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import H5 from "components/H5";
import GameHeaderStyled, { Score } from "./GameHeaderStyled";
import Paragraph from "../Paragraph/index";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const GameHeader = props => {
	return (
		<GameHeaderStyled {...props}>
			<div>
				<Paragraph> You</Paragraph>
				<CSSTransition key={props.userScore} timeout={500} classNames="fade">
					<Score className="animate" pos="left" score={props.userScore}>
						{props.userScore}
					</Score>
				</CSSTransition>
			</div>
			<div className="GameHeader-RoundBox">
				{props.gameMode === "bestofthree" ? (
					<>
						<H5> Round </H5>
						<span className="bestofthree">{props.rounds} / 3</span>
					</>
				) : (
					<span> Round {props.rounds} </span>
				)}
			</div>
			<div>
				<Paragraph>{props.opponent}</Paragraph>

				<CSSTransition
					key={props.opponentScore}
					timeout={500}
					classNames="fade"
				>
					<Score className="animate" pos="right" score={props.opponentScore}>
						{props.opponentScore}
					</Score>
				</CSSTransition>
			</div>
		</GameHeaderStyled>
	);
};

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
