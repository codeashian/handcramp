import React from "react";
import { withRouter } from "react-router-dom";

import View from "containers/View";

import sortPlayers from "helpers/sortPlayers.mjs";
import socket from "../../socket/index";

import H4 from "components/H4";
import Button from "components/Button/";
import Modal from "components/Modal";
import GameWrapper from "../../components/GameWrapper/index";

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

	render() {
		return (
			<View title="Game">
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
					replay={this.replay}
					opponentType="Friend"
					scores={this.state.scores}
					goBack={() => this.props.history.push("/start")}
				/>
				<Modal active={this.state.modal}>
					<H4>{this.state.modal && modals[this.state.modal].title}</H4>
					<p>{this.state.modal && modals[this.state.modal].message}</p>
					<Button
						margin="3rem 0 0 0"
						small
						routeChange={false}
						onClick={() => this.props.history.push(`/start`)}
					>
						Ok
					</Button>
				</Modal>
			</View>
		);
	}
}

export default withRouter(GameView);
