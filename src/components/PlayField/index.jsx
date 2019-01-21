import React from "react";
import PropTypes from "prop-types";
import PlayFieldStyled from "./PlayFieldStyled";
import Hand from "components/Hand";
import H2 from "components/H2";

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
		const texts = {
			win: "YOU WIN",
			lose: "YOU LOSE",
			draw: "IT'S A TIE"
		};

		let icon = this.props.result;

		if (this.props.result === "draw") {
			icon = `tie${this.props.players.user.hand}`;
		}

		return (
			<>
				<H2 className="PlayField-ResultTitle"> {texts[this.props.result]}</H2>
				<div className="PlayField-Result">
					<Hand
						className={`hand-${icon}`}
						hand={icon}
						play={true}
						autoPlay={true}
					/>
				</div>
			</>
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
				{this.props.ended && this.props.result
					? this.renderResult()
					: this.renderHands()}
			</PlayFieldStyled>
		);
	}
}

PlayField.propTypes = {
	playing: PropTypes.bool,
	players: PropTypes.object,
	shouldPlay: PropTypes.bool,
	handleGameEnd: PropTypes.func,
	result: PropTypes.string,
	ended: PropTypes.bool
};

PlayField.defaultProps = {
	// target: '_self'
};

export default PlayField;
