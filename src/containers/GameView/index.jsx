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
import ResultTitle from "../../components/ResultTitle/index";
import H5 from "../../components/H5/index";

const modals = {
	disconnecting: {
		title: "Opponent disconnected",
		message: "Your opponent didn't want to play with you anymore... Start over"
	},
	error: {
		title: "Opponent disconnected",
		message: "Your opponent didn't want to play with you anymore... Start over"
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
		const gameMode = this.props.location.gameMode;

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

		client.onError(this.onError.bind(this));
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
			room,
			gameMode: room.gameMode
		});

		console.log("TCL: GameView -> joined -> room", room);
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

	onError = type => {
		this.setState({
			modal: type
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
								<ResultTitle
									winnerId={this.state.winnerId}
									userId={this.state.id}
									userValue={user.hand}
									opponentValue={opponent.hand}
									show={this.state.gameEnd}
								/>
								<PlayField
									animationEnd={this.onAnimationEnd}
									players={this.state.players}
									shouldPlay={this.state.shouldPlay}
									winnerId={this.state.winnerId}
									userId={this.state.id}
									gameEnd={this.state.gameEnd}
								/>
							</Col>
						</Row>
						<Row className="buttons">
							<div
								className={`GameView-ChooseHand ${
									!user.hand && !this.state.gameEnd ? "show" : ""
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
									className={`animated-button ${!this.state.gameEnd && "show"}`}
								>
									{this.renderButtons()}
								</ButtonGroup>
								<Button
									routeChange={false}
									className={`animated-button ${this.state.gameEnd && "show"}`}
									small
									onClick={() => this.replay()}
								>
									play again
								</Button>
							</Col>
						</Row>
					</Container>
					<div
						className="GameView-BackButton"
						onClick={() => this.props.history.push("/")}
					>
						<img src="./assets/icons/arrow-back.svg" />
						<H5>Back to start</H5>
					</div>
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
