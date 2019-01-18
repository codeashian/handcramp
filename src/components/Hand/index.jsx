import React from "react";
import PropTypes from "prop-types";

import HandStyled from "./HandStyled";
import Lottie from "react-lottie";

import scissors from "../../assets/animations/scissors.json";
import paper from "../../assets/animations/paper.json";
import rock from "../../assets/animations/rock.json";
import win from "../../assets/animations/win.json";
import lose from "../../assets/animations/lose.json";

const animations = {
	scissors,
	paper,
	rock,
	win,
	lose
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
		<div className={props.className}>
			<Lottie
				className={props.className}
				options={defaultOptions}
				isStopped={!props.play}
				isPaused={!props.play}
				eventListeners={callback}
			/>
		</div>
	);
};

Hand.propTypes = {
	hand: PropTypes.string,
	play: PropTypes.bool,
	onEnd: PropTypes.func,
	className: PropTypes.className
};

Hand.defaultProps = {
	// target: '_self'
};

export default Hand;
