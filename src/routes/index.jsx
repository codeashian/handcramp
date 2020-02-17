import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import StartView from 'containers/StartView';
import SomeView from 'containers/SomeView';
import MainView from 'containers/MainView';
import PreGameView from 'containers/PreGameView';
import GameView from 'containers/GameView';
import GameComputerView from 'containers/GameComputerView';
import AnimatedRoute from 'components/AnimatedRoute';

class Routes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {}
		};
	}

	render() {
		return (
			<AnimatedRoute>
				{location => (
					<Switch location={location}>
						<Route exact path="/" render={() => <MainView />} />
						<Route exact path="/start" render={() => <StartView />} />
						<Route exact path="/friend" render={() => <PreGameView type="friend" />} />
						<Route exact path="/computer" render={() => <PreGameView type="computer" />} />
						<Route exact path="/game" render={() => <GameComputerView />} />
						<Route exact path="/:room" render={() => <GameView />} />
						<Route render={() => <Redirect to="/" />} />
					</Switch>
				)}
			</AnimatedRoute>
		);
	}
}

export default withRouter(Routes);
