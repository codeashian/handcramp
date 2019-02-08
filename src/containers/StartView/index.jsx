import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import View from "containers/View";
import Button from "components/Button/";
import Row from "components/Row";
import H2 from "components/H2";
import Col from "components/Col";
import socket from "socket";

import Container from "components/Container";

class StartView extends React.Component {
	handleButtonClick = type => {
		if (type === "friend") {
			const client = socket();
			this.props.history.push({
				pathname: "pregame"
			});
		}
	};

	render() {
		return (
			<View title="Start view">
				<Container gridTemplate="1fr 1.3fr / 1fr" className="start-view">
					<Row>
						<Col justifyContent="flex-end">
							<H2> Choose your opponent </H2>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="button-wrapper">
								<Button routeChange={false} margin="2rem">
									Computer*
								</Button>
								<Button
									routeChange={false}
									margin="2rem"
									onClick={() => this.handleButtonClick("friend")}
								>
									friend
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</View>
		);
	}
}

export default withRouter(StartView);

/*
SomeView.propTypes = {
	user: PropTypes.object
};

SomeView.defaultTypes = {
	user: {}
};
*/
