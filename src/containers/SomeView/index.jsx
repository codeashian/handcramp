import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import socket from "socket/index.js";
import View from "containers/View";
import getNewScreen from "helpers/getNewScreen.mjs";
import setScreenName from "helpers/setScreenName.mjs";

class SomeView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			client: socket(),
			message: "",
			chatHistory: []
		};
	}

	toggleScreen(type, newScreen) {
		this.setState({
			[type]: getNewScreen(this.state.screens, setScreenName(newScreen))
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.state.client.sendMessage(this.state.message);
		this.setState({
			message: ""
		});
	}

	handleChange(e) {
		this.setState({
			message: e.target.value
		});
	}

	onMessageRecieved(message) {
		this.setState({
			chatHistory: this.state.chatHistory.concat(message)
		});
	}

	async componentDidMount() {
		this.state.client.getMessage(this.onMessageRecieved.bind(this));
	}

	render() {
		return (
			<View title="Some view">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input
						onChange={this.handleChange.bind(this)}
						value={this.state.message}
					/>
				</form>
				<div>
					<ul>
						{this.state.chatHistory.map(item => (
							<li key={item}> {item} </li>
						))}
					</ul>
				</div>
				<section>Content goes here</section>
			</View>
		);
	}
}

export default withRouter(SomeView);

/*
SomeView.propTypes = {
	user: PropTypes.object
};

SomeView.defaultTypes = {
	user: {}
};
*/
