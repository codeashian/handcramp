import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import View from "containers/View";
import GameViewStyled from "./GameViewStyled";
import sortPlayers from "helpers/sortPlayers.mjs";
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
	roundEnd: false,
	gameMode: "bestofthree",
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

		client.handSelected(this.handSelected.bind(this));

		client.play(this.onPlay.bind(this));

		client.onReplay(this.onReplay.bind(this));

		client.onRoundEnd(this.handleRoundEnd.bind(this));

		client.onGameEnd(this.handleGameEnd.bind(this));

		// client.handSelected(this.onHandSelected.bind(this));

		// client.play(this.play.bind(this));

		// client.onReplay(this.onReplay.bind(this));

		// client.onNextRound(this.onNextRound.bind(this));

		// client.error(this.error.bind(this));
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
		this.props.history.push("/start");
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

	handSelected = players => {
		this.setState({
			players: sortPlayers(players, this.state.id)
		});
	};

	selectHand = (e, value) => {
		e.target.classList.add("selected");

		this.setState({
			selectedHand: value,
			enableButtons: false
		});
		this.state.client.selectHand(value, this.state.roomId, this.state.id);
	};

	onAnimationEnd = () => {
		this.state.client.roundEnd(this.state.roomId, this.state.id);
	};

	onPlay = players => {
		this.setState({
			shouldPlay: true,
			players: sortPlayers(players, this.state.id)
		});
	};

	replay = () => {
		this.state.client.replay(this.state.roomId, this.state.id);
	};

	onReplay = response => {
		const players = sortPlayers(response.players, this.state.id);

		this.setState({
			players: players,
			gameEnd: false,
			selectedHand: "",
			enableButtons: true,
			currentRound: response.round,
			scores: {
				user: players.user.score,
				opponent: players.opponent.score
			}
		});
	};

	handleRoundEnd = response => {
		const players = sortPlayers(response.players, this.state.id);
		this.setState({
			shouldPlay: false,
			winnerId: response.winnerId,
			currentRound: response.round,
			enableButtons: true,
			selectedHand: "",
			scores: {
				user: players.user.score,
				opponent: players.opponent.score
			}
		});
	};

	handleGameEnd = response => {
		const players = sortPlayers(response.players, this.state.id);
		this.setState({
			gameEnd: true,
			winnerId: response.winnerId,
			shouldPlay: false,
			players,
			scores: {
				user: players.user.score,
				opponent: players.opponent.score
			}
		});
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
					onClick={e => this.selectHand(e, value)}
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

	render() {
		const { user, opponent } = this.state.players;
		return (
			<View title="Game">
				<GameViewStyled>
					<GameHeader
						className="game-header"
						rounds={this.state.currentRound}
						opponentScore={this.state.scores.opponent}
						userScore={this.state.scores.user}
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
									animationEnd={this.onAnimationEnd}
									players={this.state.players}
									shouldPlay={this.state.shouldPlay}
									winnerId={this.state.winnerId}
									userId={this.state.id}
									// ended={this.state.roundEnd}
									gameEnd={this.state.gameEnd}
								/>
							</Col>
						</Row>
						<Row className="buttons">
							<Col>
								{!this.state.gameEnd ? (
									<ButtonGroup margin="2rem 0">
										{this.renderButtons()}
									</ButtonGroup>
								) : (
									<Button small onClick={() => this.replay()}>
										play again
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
