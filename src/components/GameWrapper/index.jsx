import React from "react";
import PropTypes from "prop-types";

import GameWrapperStyled from "./GameWrapperStyled";
import GameHeader from "components/GameHeader";
import Container from "components/Container";
import Row from "components/Row";
import Col from "components/Col";
import Button from "components/Button/";
import ButtonGroup from "components/ButtonGroup/";
import PlayField from "components/PlayField";
import TitleWave from "components/TitleWave/index";
import ResultTitle from "components/ResultTitle/index";
import H5 from "components/H5/index";
import BackButton from "../BackButton/index";

class GameWrapper extends React.Component {
	renderButtons() {
		const BUTTONS = ["rock", "paper", "scissors"];

		return BUTTONS.map((value, index) => {
			return (
				<Button
					key={value}
					smallFont
					width="33.33%"
					routeChange={false}
					onClick={e => this.props.selectHand(e, value)}
					disabled={!this.props.enableButtons}
					selected={
						this.props.selectedHand ? this.props.selectedHand === value : false
					}
					index={index}
				>
					<img src={`assets/icons/${value}.svg`} />
				</Button>
			);
		});
	}

	render() {
		const { user, opponent } = this.props.players;
		console.log(this.props);
		return (
			<GameWrapperStyled>
				<BackButton handleClick={this.props.goBack} />
				<GameHeader
					className="game-header"
					rounds={this.props.currentRound}
					opponentScore={this.props.scores.opponent}
					userScore={this.props.scores.user}
					gameMode={this.props.gameMode}
					opponent={this.props.opponentType}
				/>
				<Container
					className="game-view"
					header={true}
					gridTemplate="4fr 1fr / 1fr"
				>
					<Row>
						<Col justifyContent="center" className="GameView-Col">
							<div className="GameView-Loader">
								{user.hand && (
									<TitleWave show={opponent.hand} text="waiting for opponent" />
								)}
							</div>
							<ResultTitle
								winnerId={this.props.winnerId}
								userId={this.props.id}
								userValue={user.hand}
								opponentValue={opponent.hand}
								show={this.props.gameEnd}
							/>
							<PlayField
								animationEnd={this.props.onAnimationEnd}
								players={this.props.players}
								shouldPlay={this.props.shouldPlay}
								winnerId={this.props.winnerId}
								userId={this.props.id}
								gameEnd={this.props.gameEnd}
							/>
						</Col>
					</Row>
					<Row className="buttons">
						<div
							className={`GameView-ChooseHand ${
								!user.hand && !this.props.gameEnd ? "show" : ""
							}`}
						>
							<H5>Choose your hand</H5>
							<svg width="20" height="11" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M0 .645a.68.68 0 0 1 .195-.47A.677.677 0 0 1 .665 0c.181 0 .338.059.468.176L9.96 9.004 18.652.313a.64.64 0 0 1 .47-.196.64.64 0 0 1 .468.196.64.64 0 0 1 .195.468.64.64 0 0 1-.195.469l-9.16 9.16a.64.64 0 0 1-.47.195.64.64 0 0 1-.468-.195L.195 1.133A.639.639 0 0 1 .05.908.728.728 0 0 1 0 .645z"
									fill="#000"
									fillRule="evenodd"
								/>
							</svg>
						</div>

						<Col className="GameView-ButtonArea">
							<ButtonGroup
								margin="2rem 0"
								className={`animated-button ${!this.props.gameEnd && "show"}`}
							>
								{this.renderButtons()}
							</ButtonGroup>
							<Button
								routeChange={false}
								className={`animated-button ${this.props.gameEnd && "show"}`}
								small
								onClick={() => this.props.replay()}
							>
								play again
							</Button>
						</Col>
					</Row>
				</Container>
			</GameWrapperStyled>
		);
	}
}

const initialPlayers = {
	user: {
		hand: ""
	},
	opponent: {
		hand: ""
	}
};

GameWrapper.propTypes = {
	gameEnd: PropTypes.bool,
	currentRound: PropTypes.number,
	players: PropTypes.object,
	gameMode: PropTypes.string,
	winnerId: PropTypes.string,
	id: PropTypes.string,
	shouldPlay: PropTypes.bool,
	scores: PropTypes.object,
	replay: PropTypes.func,
	selectedHand: PropTypes.string,
	enableButtons: PropTypes.bool,
	onAnimationEnd: PropTypes.func,
	goBack: PropTypes.func,
	opponentType: PropTypes.string
};

GameWrapper.defaultProps = {
	// target: '_self'
	players: initialPlayers,
	scores: {
		user: 0,
		opponent: 0
	}
};

export default GameWrapper;
