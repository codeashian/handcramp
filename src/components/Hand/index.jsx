import React from "react";
import PropTypes from "prop-types";

import HandStyled from "./HandStyled";
import Lottie from "react-lottie";

import scissors from "../../assets/animations/scissors.json";
import paper from "../../assets/animations/paper.json";
import rock from "../../assets/animations/rock.json";

const animations = {
	scissors,
	paper,
	rock
};

const Hand = props => {
	const defaultOptions = {
		loop: false,
		autoplay: false,
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
		<Lottie
			options={defaultOptions}
			isStopped={!props.play}
			isPaused={!props.play}
			eventListeners={callback}
		/>
	);
};

Hand.propTypes = {
	hand: PropTypes.string,
	play: PropTypes.bool,
	onEnd: PropTypes.func
};

Hand.defaultProps = {
	// target: '_self'
};

export default Hand;
