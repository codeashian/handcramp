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
import JumpingTitle from "../JumpingTitle/index";

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
								show={this.props.roundEnd}
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
							<JumpingTitle title="Choose your hand" />
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
								className={`animated-button replay ${this.props.gameEnd &&
									"show"}`}
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
	opponentType: PropTypes.string,
	roundEnd: PropTypes.bool
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
