import React from "react";
import PropTypes from "prop-types";

import GameWrapper from "components/GameWrapper";
import View from "../View/index";
import { withRouter } from "react-router-dom";

import checkWinner from "../../../server/functions/checkWinner";

const initialPlayers = {
	user: {
		hand: "rock",
		score: 0
	},
	opponent: {
		hand: "scissors",
		score: 0
	}
};

const initialState = {
	players: initialPlayers,
	roundEnd: false,
	gameMode: "",
	shouldPlay: false,
	selectedHand: "",
	enableButtons: true,
	modal: "",
	gameEnd: false,
	winnerId: "",
	id: "",
	room: {},
	scores: {
		user: 0,
		opponent: 0
	}
};

class GameComputerView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentRound: 1,
			...initialState
		};
	}

	componentDidMount() {
		this.setState({
			gameMode: "",
			id: "user"
		});
	}

	getPlayers = userChoice => {
		const { players, currentRound } = this.state;

		const matrix = {
			scissors: "rock",
			paper: "scissors",
			rock: "paper"
		};

		const randomHand = Math.floor(Math.random() * 3) + 1;
		const randomWin = Math.floor(Math.random() * 3) + 1;
		const hands = ["rock", "paper", "scissors"];
		let opponentHand = hands[randomHand - 1];

		if (randomWin !== 3) {
			opponentHand = matrix[userChoice];
		}

		return {
			user: {
				...players.user,
				hand: userChoice
			},
			opponent: {
				...players.opponent,
				hand: opponentHand
			}
		};
	};

	selectHand = (e, value) => {
		e.target.classList.add("selected");

		this.setState({
			selectedHand: value,
			enableButtons: false,
			players: this.getPlayers(value)
		});

		setTimeout(() => {
			this.setState({
				shouldPlay: true
			});
		}, 3000);

		const circle = document.querySelector(".PlayField-Circle");

		setTimeout(() => {
			circle.classList.add("animate");
		}, 4400);
	};

	onReplay = () => {
		this.setState({
			gameEnd: false,
			selectedHand: "",
			players: {
				user: {
					...this.state.players.user,
					hand: ""
				},
				opponent: {
					...this.state.players.opponent,
					hand: ""
				}
			},
			winnerId: "",
			shouldPlay: false,
			enableButtons: true,
			currentRound: this.state.currentRound + 1,
			scores: {
				user: this.state.players.user.score,
				opponent: this.state.players.opponent.score
			}
		});
	};

	onAnimationEnd = () => {
		const { user, opponent } = this.state.players;
		const circle = document.querySelector(".PlayField-Circle");

		const players = [
			{ id: "user", hand: user.hand },
			{ id: "opponent", hand: opponent.hand }
		];
		circle.classList.remove("animate");
		const winnerId = checkWinner(players);

		if (winnerId !== "draw") {
			this.setState({
				players: {
					...this.state.players,
					[winnerId]: {
						...this.state.players[winnerId],
						score: this.state.players[winnerId].score + 1
					}
				},
				scores: {
					...this.state.scores,
					[winnerId]: this.state.players[winnerId].score + 1
				}
			});
		}

		this.setState({
			gameEnd: true,
			shouldPlay: false,
			enableButtons: true,
			selectedHand: "",
			winnerId
		});
	};

	render() {
		return (
			<View title="Handcramp">
				<GameWrapper
					gameEnd={this.state.gameEnd}
					currentRound={this.state.currentRound}
					players={this.state.players}
					gameMode={this.state.gameMode}
					winnerId={this.state.winnerId}
					id={this.state.id}
					shouldPlay={this.state.shouldPlay}
					onAnimationEnd={this.onAnimationEnd}
					enableButtons={this.state.enableButtons}
					selectedHand={this.state.selectedHand}
					selectHand={this.selectHand}
					replay={this.onReplay}
					scores={this.state.scores}
					opponentType="Computer"
					roundEnd={this.state.gameEnd}
					goBack={() => this.props.history.push("/start")}
				/>
			</View>
		);
	}
}

GameComputerView.propTypes = {
	title: PropTypes.string
};

GameComputerView.defaultProps = {
	// target: '_self'
	title: "Computer Game"
};

export default withRouter(GameComputerView);
