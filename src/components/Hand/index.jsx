import React from "react";
import PropTypes from "prop-types";

import HandStyled from "./HandStyled";
import Lottie from "react-lottie";

import scissors from "../../assets/animations/scissors.json";
import paper from "../../assets/animations/paper.json";
import rock from "../../assets/animations/rock.json";
import win from "../../assets/animations/win.json";
import lose from "../../assets/animations/lose.json";
import tiescissors from "../../assets/animations/tie-scissors.json";
import tiepaper from "../../assets/animations/tie-paper.json";
import tierock from "../../assets/animations/tie-rock.json";

const animations = {
	scissors,
	paper,
	rock,
	win,
	lose,
	tiescissors,
	tiepaper,
	tierock
};

const Hand = props => {
	const defaultOptions = {
		loop: false,
		autoplay: props.autoPlay || false,
		// autoplay: true,
		animationData: animations[props.hand],
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	};

	const callback = props.onEnd
		? [
				{
					eventName: "complete",
					callback: props.onEnd
				}
		  ]
		: [];

	return (
		<HandStyled className={props.className}>
			<Lottie
				className={props.className}
				options={defaultOptions}
				isStopped={!props.play}
				isPaused={!props.play}
				eventListeners={callback}
			/>
		</HandStyled>
	);
};

Hand.propTypes = {
	hand: PropTypes.string,
	play: PropTypes.bool,
	onEnd: PropTypes.func,
	className: PropTypes.string,
	autoPlay: PropTypes.bool
};

Hand.defaultProps = {
	// target: '_self'
};

export default Hand;
