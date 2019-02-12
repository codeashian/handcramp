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
