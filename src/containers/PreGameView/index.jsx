import React from "react";
import { withRouter } from "react-router-dom";

import View from "containers/View";
import socket from "../../socket/index";
import Container from "components/Container/";
import Row from "components/Row";
import H4 from "components/H4";
import Col from "components/Col";
import Button from "components/Button/";
import ButtonGroup from "components/ButtonGroup/";
import CheckboxSlider from "../../components/CheckboxSlider/index";
import H5 from "../../components/H5/index";

class PreGameView extends React.Component {
	constructor() {
		super();
		this.state = {
			client: socket(),
			gameMode: "",
			userMessages: [
				"Share this link with your friend",
				"Link copied to clipboard!"
			],
			activeMessage: 0,
			linkCopied: false
		};
	}

	componentDidMount() {
		this.state.client.createRoom();

		this.state.client.roomCreated(data => {
			this.setState({
				roomId: data.roomId,
				player: data.player
			});
		});
	}

	handleBeginGame = () => {
		this.props.history.push({
			pathname: `/${this.state.roomId}`,
			gameMode: this.state.gameMode
		});
	};

	handleSliderChange = value => {
		this.setState({
			gameMode: value ? "bestofthree" : ""
		});
	};

	handleCopyClick = e => {
		e.preventDefault();
		this.input.select();

		document.execCommand("copy");
		this.input.blur();

		this.setState({
			activeMessage: 1,
			linkCopied: true
		});
	};
	render() {
		return (
			<View title="Some view">
				<Container gridTemplate="1fr 5fr / 1fr">
					<Row>
						<Col textAlign="center">
							<H4 uppercase> Friend </H4>
						</Col>
					</Row>
					<Row height="auto">
						<Col margin="0 0 2rem 0">
							<CheckboxSlider handleChange={this.handleSliderChange} />
						</Col>
						<Col>
							<H5 uppercase>
								{this.state.userMessages[this.state.activeMessage]}
							</H5>
							<ButtonGroup margin="0.4rem 0 2rem 0">
								<Button
									index={0}
									smallFont
									width="80%"
									dark={this.state.linkCopied}
									text={true}
								>
									<input
										ref={ref => (this.input = ref)}
										type="text"
										onChange={() => null}
										value={`${window.location.origin}/${this.state.roomId}`}
									/>
								</Button>
								<Button
									index={1}
									routeChange={false}
									onClick={this.handleCopyClick}
									smallFont
									width="20%"
									text={true}
									dark={this.state.linkCopied}
								>
									Copy
								</Button>
							</ButtonGroup>

							<Button
								routeChange={false}
								margin="10% 0"
								small
								onClick={this.handleBeginGame}
							>
								Start Game
							</Button>
						</Col>
					</Row>
				</Container>
			</View>
		);
	}
}

export default withRouter(PreGameView);

/*
PreGameView.propTypes = {
	user: PropTypes.object
};

PreGameView.defaultTypes = {
	user: {}
};
*/
