import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import View from "containers/View";
import GameViewStyled from "./GameViewStyled";
import getNewScreen from "helpers/getNewScreen.mjs";
import setScreenName from "helpers/setScreenName.mjs";
import socket from "../../socket/index";
import Container from "components/Container/";
import Row from "components/Row";
import H2 from "components/H2";
import H4 from "components/H4";
import Col from "components/Col";
import Button from "components/Button/";
import ButtonGroup from "components/ButtonGroup/";
import GameHeader from "components/GameHeader/";
import PlayField from "components/PlayField";
import TitleWave from "../../components/TitleWave/index";
import Modal from "components/Modal";

const modals = {
	disconnecting: {
		title: "Opponent disconnected",
		message: "Your opponent didn't want to play with you anymore... Start over"
	},
	error: {
		title: "Something went wrong",
		message: "What the f did you do? Start over."
	},
	timeout: {
		title: "TOOO SLOW",
		message: "Way too slow girl. Try again and speed it up"
	},
	roomFull: {
		title: "Room is full",
		message: "Hey, third wheel, the room is full. Play with someone else."
	}
};

const initialPlayers = {
	user: {
		hand: ""
	},
	opponent: {
		hand: ""
	}
};

const initialState = {
	players: initialPlayers,
	result: "",
	playing: false,
	roundEnd: false,
	gameMode: "bestofthree",
	selectedHand: "",
	enableButtons: true,
	modal: ""
};

class GameView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			client: socket(),
			currentRound: 1,
			...initialState
		};
	}

	componentDidMount() {
		const { client } = this.state;
		const roomId = this.props.match.params.room;
		// const gameMode = this.props.location.gameMode;
		const gameMode = "bestofthree";

		this.setState({
			roomId,
			gameMode
		});

		client.joinRoom(roomId, gameMode);

		client.roomIsFull(this.roomIsFull.bind(this));

		client.roomJoined(this.joined);

		client.handSelected(this.onHandSelected.bind(this));

		client.play(this.play.bind(this));

		client.onReplay(this.onReplay.bind(this));

		client.onNextRound(this.onNextRound.bind(this));

		client.error(this.error.bind(this));
	}

	componentWillUnmount() {
		this.state.client.leaveRoom(this.state.roomId);
		this.setState({
			...initialState
		});
	}

	joined = ({ id, room }) => {
		this.setState({
			id,
			room
		});
	};

	roomIsFull = () => {
		alert("room is full :( ");
		this.props.history.push("/start");
	};

	error = modal => {
		console.log(modal);
		this.setState({
			modal
		});
	};

	onHandButtonClick(e, value) {
		this.setState({
			selectedHand: value,
			enableButtons: false
		});
		this.state.client.selectHand(value, this.state.roomId);
	}

	onHandSelected(players) {
		const sortedPlayers = this.sortPlayers(players);
		this.setState({
			players: sortedPlayers
		});
	}

	getUserById = id => {
		if (this.state.players) {
			return this.state.players.filter(item => item.id === id);
		}
	};

	sortPlayers = players => {
		return players.reduce(
			(acc, item) => {
				item.id === this.state.id ? (acc.user = item) : (acc.opponent = item);
				return acc;
			},
			{ user: {}, opponent: {} }
		);
	};

	play = ({ winnerId, players, round }) => {
		const sortedPlayers = this.sortPlayers(players);
		let result = "";

		if (winnerId) {
			if (winnerId === "draw") {
				result = "draw";
			} else if (winnerId === this.state.id) {
				result = "win";
			} else {
				result = "lose";
			}
		}

		setTimeout(() => {
			this.setState({
				playing: true,
				players: sortedPlayers,
				result,
				currentRound: round,
				enableButtons: false
			});
		}, 1000);
	};

	gameEnd = () => {
		this.setState({
			roundEnd: true,
			playing: false
		});
		this.state.client.reset(this.state.roomId);
	};

	onReplay = ({ round }) => {
		// this.setState({
		// 	currentRound: round
		// });
	};

	onNextRound = data => {};

	nextRound = () => {
		this.state.client.nextRound(this.state.roomId);
	};

	replay = () => {
		this.setState({
			...initialState,
			players: this.state.players
		});

		this.state.client.replay(this.state.roomId);
	};

	renderButtons() {
		const BUTTONS = ["rock", "paper", "scissors"];

		return BUTTONS.map((value, index) => {
			return (
				<Button
					key={value}
					smallFont
					width="33.33%"
					routeChange={false}
					onClick={e => this.onHandButtonClick(e, value)}
					disabled={!this.state.enableButtons}
					selected={
						this.state.selectedHand ? this.state.selectedHand === value : false
					}
					index={index}
				>
					<img src={`assets/icons/${value}.svg`} />
				</Button>
			);
		});
	}

	updateScore() {
		this.setState({
			test: this.state.test + 1
		});
	}

	renderPlayAgainButton = () => {
		const texts = ["Play again", "Next round"];
		if (this.state.result) {
			return texts[0];
		}
		return texts[1];
	};

	render() {
		const { user, opponent } = this.state.players;
		return (
			<View title="Game">
				<GameViewStyled>
					<GameHeader
						className="game-header"
						rounds={this.state.currentRound}
						opponentScore={opponent.score || 0}
						userScore={user.score || 0}
						gameMode={this.state.gameMode}
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
										<TitleWave
											show={opponent.hand}
											text="waiting for opponent"
										/>
									)}
								</div>
								<PlayField
									handleGameEnd={this.gameEnd.bind(this)}
									players={this.state.players}
									playing={this.state.playing}
									result={this.state.result}
									ended={this.state.roundEnd}
								/>
							</Col>
						</Row>
						<Row className="buttons">
							<Col>
								{!this.state.roundEnd ? (
									<ButtonGroup margin="2rem 0">
										{this.renderButtons()}
									</ButtonGroup>
								) : (
									<Button small onClick={() => this.replay()}>
										{this.state.result ? "play again" : "next round"}
									</Button>
								)}
							</Col>
						</Row>
					</Container>
				</GameViewStyled>
				<Modal active={this.state.modal}>
					<H4>{this.state.modal && modals[this.state.modal].title}</H4>
					<p>{this.state.modal && modals[this.state.modal].message}</p>
					<Button
						margin="3rem 0 0 0"
						small
						routeChange={false}
						onClick={() => this.props.history.push("/pregame")}
					>
						Ok
					</Button>
				</Modal>
			</View>
		);
	}
}

export default withRouter(GameView);
