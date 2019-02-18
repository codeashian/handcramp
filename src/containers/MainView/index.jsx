import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import View from "containers/View";
import Button from "components/Button";
import BackgroundPattern from "components/BackgroundPattern";
import Container from "components/Container";
import Logo from "components/Logo";
import Row from "components/Row";
import Col from "components/Col";

class SomeView extends React.Component {
	state = {
		showLogo: false
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				showContent: true
			});
		}, 14 * 130);
	}

	handleButtonClick = () => {
		this.props.history.push("/start");
	};

	render() {
		return (
			<View title="Handcramp">
				<BackgroundPattern />
				<Container>
					<Row>
						<Col justifyContent="center">
							<div className="start-wrapper">
								<Logo show={this.state.showContent} />

								<div className="button">
									<Button
										margin="1rem 0 0 0"
										show={this.state.showContent}
										animation
										animationDelay="300"
										small
										onClick={this.handleButtonClick}
									>
										Begin
									</Button>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
				<div className="footer">
					Made by{" "}
					<a href="https://www.linkedin.com/in/elina-åberg-776a2a87">Elina</a> &
					<a
						target="_blank"
						href="https://www.linkedin.com/in/artdirectorandersolofsson/"
					>
						{" "}
						Anders
					</a>
				</div>
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
