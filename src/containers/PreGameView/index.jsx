import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import View from "containers/View";
import socket from "../../socket/index";
import Container from "components/Container/";
import Row from "components/Row";
import H3 from "components/H3";
import H4 from "components/H4";
import Col from "components/Col";
import Button from "components/Button/";
import ButtonGroup from "components/ButtonGroup/";
import Paragraph from "../../components/Paragraph/index";
import CheckboxSlider from "../../components/CheckboxSlider/index";

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
			activeMessage: 0
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
			activeMessage: 1
		});
	};
	render() {
		return (
			<View title="Some view">
				<Container gridTemplate="3fr 5fr / 1fr">
					<Row>
						<Col textAlign="center">
							<H4 uppercase> Friend </H4>
						</Col>
					</Row>
					<Row>
						<Col>
							<Paragraph uppercase>
								{this.state.userMessages[this.state.activeMessage]}
							</Paragraph>
							<ButtonGroup margin="0.4rem 0 2rem 0">
								<Button index={0} smallFont width="80%">
									<input
										ref={ref => (this.input = ref)}
										type="text"
										onChange={() => null}
										value={`http://localhost:8081/${this.state.roomId}`}
									/>
								</Button>
								<Button
									index={1}
									routeChange={false}
									onClick={this.handleCopyClick}
									smallFont
									width="20%"
								>
									Copy
								</Button>
							</ButtonGroup>
							<CheckboxSlider handleChange={this.handleSliderChange} />

							<Button margin="10% 0" small onClick={this.handleBeginGame}>
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
