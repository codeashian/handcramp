import React from "react";
import PropTypes from "prop-types";
import PlayFieldStyled from "./PlayFieldStyled";
import Hand from "components/Hand";
import H3 from "components/H3";
import checkWinner from "helpers/game";
import winIcon from "../../assets/icons/win.svg";
import loseIcon from "../../assets/icons/lose.svg";

class PlayField extends React.Component {
	constructor() {
		super();
	}

	renderHands = () => (
		<>
			<div className="PlayField-Hand PlayField-Hand--Left">
				{this.props.players.user.hand && (
					<Hand
						className="hand-left"
						onEnd={this.props.handleGameEnd}
						play={this.props.playing}
						hand={this.props.players.user.hand}
					/>
				)}
			</div>
			<div className="PlayField-Hand PlayField-Hand--Right">
				{this.props.players.opponent.hand && (
					<Hand
						className="hand-left"
						hand={this.props.players.opponent.hand}
						play={this.props.playing}
					/>
				)}
			</div>
		</>
	);

	renderResult = () => {
		const icons = {
			win: winIcon,
			lose: loseIcon,
			draw: winIcon
		};

		return (
			<div className="PlayField-Result">
				{console.log(this.props.result)}
				<Hand
					className={`hand-${this.props.result}`}
					hand={this.props.result}
					play={true}
				/>
			</div>
		);
	};

	render() {
		const { playing, players } = this.props;
		let scaleCircle = false;
		if (playing && players.opponent.hand && players.user.hand) {
			scaleCircle = true;
		}
		return (
			<PlayFieldStyled {...this.props} scaleCircle={scaleCircle}>
				<div className="PlayField-Circle" />
				{this.props.ended ? this.renderResult() : this.renderHands()}
			</PlayFieldStyled>
		);
	}
}

PlayField.propTypes = {
	playing: PropTypes.bool,
	players: PropTypes.object,
	shouldPlay: PropTypes.bool,
	handleGameEnd: PropTypes.func
};

PlayField.defaultProps = {
	// target: '_self'
};

export default PlayField;
