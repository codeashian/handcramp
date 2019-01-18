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
import Col from "components/Col";
import Button from "components/Button/";
import ButtonGroup from "components/ButtonGroup/";
import GameHeader from "components/GameHeader/";
import PlayField from "components/PlayField";
import TitleWave from "../../components/TitleWave/index";

const initialState = {
	players: {
		user: {
			hand: ""
		},
		opponent: {
			hand: ""
		}
	},
	test: 0,
	result: "",
	playing: false,
	roundEnd: false,
	screens: {
		isDisplayingPickHand: true,
		isDisplayingGame: false,
		isDisplayingEnd: false
	}
};

class GameView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			client: socket(),
			rounds: 1,
			...initialState
		};
	}

	componentDidMount() {
		const roomId = this.props.match.params.room;

		this.setState({
			roomId
		});

		this.state.client.joinRoom(roomId);
		this.state.client.roomIsFull(this.roomIsFull.bind(this));
		this.state.client.roomJoined(this.joined);
		this.state.client.handSelected(this.onHandSelected.bind(this));
		this.state.client.play(this.play.bind(this));
		// this.state.client.shouldPlay(this.play.bind(this));
		this.state.client.playerDisconnected(
			this.handlePlayerDisconnect.bind(this)
		);
	}

	componentWillUnmount() {
		this.state.client.leaveRoom(this.state.roomId);
		this.setState({
			...initialState
		});
	}

	joined = data => {
		this.setState({
			id: data.id
		});
	};

	roomIsFull = () => {
		alert("room is full :( ");
		this.props.history.push("/start");
	};

	handlePlayerDisconnect = () => {
		this.setState({
			...initialState
		});

		alert("opponent disconnected :( ");

		this.toggleScreen("PickHand");
	};

	onHandButtonClick(e, value) {
		this.state.client.selectHand(value, this.state.roomId);
	}

	onHandSelected(players) {
		const sortedPlayers = this.sortPlayers(players);
		this.setState({
			players: sortedPlayers
		});

		if (sortedPlayers.user.hand) {
			this.toggleScreen("Game");
		}
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

	play = data => {
		const sortedPlayers = this.sortPlayers(data.players);
		let result = "";

		if (data.winnerId === false) {
			result = "draw";
		} else if (data.winnerId === this.state.id) {
			result = "win";
		} else {
			result = "lose";
		}

		setTimeout(() => {
			this.setState({
				playing: true,
				players: sortedPlayers,
				result: result
			});
		}, 5000);
	};

	gameEnd = () => {
		this.setState({
			roundEnd: true
		});
		console.log("round end");
		this.state.client.reset(this.state.roomId);
	};

	restart = () => {
		this.setState({
			...initialState
		});
		// this.state.client.replay(this.state.roomId);
		this.toggleScreen("PickHand");
	};

	toggleScreen = newScreen => {
		this.setState({
			screens: getNewScreen(this.state.screens, setScreenName(newScreen))
		});
	};

	renderButtons(disabled) {
		const BUTTONS = ["rock", "paper", "scissors"];

		return BUTTONS.map((value, index) => {
			return (
				<Button
					key={value}
					smallFont
					width="33.33%"
					routeChange={false}
					onClick={e => this.onHandButtonClick(e, value)}
					disabled={this.state.players.user.hand ? true : false}
					selected={
						this.state.players.user.hand
							? this.state.players.user.hand === value
							: false
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

	render() {
		const { user, opponent } = this.state.players;
		return (
			<View title="Game">
				<GameViewStyled>
					<GameHeader
						className="game-header"
						rounds={this.state.rounds}
						opponentScore={opponent.score || 0}
						userScore={user.score || 0}
						test={this.state.test}
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
									<Button small onClick={() => this.restart()}>
										Play again
									</Button>
								)}
							</Col>
						</Row>
						{/* <button onClick={() => this.updateScore()}> hello </button> */}
					</Container>
				</GameViewStyled>
			</View>
		);
	}
}

export default withRouter(GameView);
