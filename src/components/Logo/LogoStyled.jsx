import styled, { keyframes } from "styled-components";

import colors from "tokens/colors";
import * as animations from "animations";

const LogoStyled = styled.div`
	.circle {
		animation: ${animations.fadeScale} 0.5s ease forwards;
	}

	h3 {
		opacity: 0;
		position: absolute;
		transform: translateX(-50%) translateY(-50%);
		top: 50%;
		left: 50%;
		margin: 0;
		text-align: center;
		animation: ${animations.fadeIn} 0.4s ease forwards 1000ms;
	}

	.paper,
	.rock,
	.scissors {
		position: absolute;
		opacity: 0;
	}

	.paper {
		top: 0;
		left: 50%;
		animation: ${animations.paperAnimation} 0.4s cubic-bezier(0.9, 0.6, 0.25, 1)
			forwards 200ms;
	}

	.scissors {
		top: 66%;
		right: 0;
		animation: ${animations.scissorsAnimation} 0.4s
			cubic-bezier(0.9, 0.6, 0.25, 1) forwards 400ms;
	}

	.rock {
		top: 66%;
		left: 0;
		animation: ${animations.rockAnimation} 0.4s cubic-bezier(0.9, 0.6, 0.25, 1)
			forwards 600ms;
	}

	.circle,
	h3,
	.paper,
	.rock,
	.scissors {
		animation-play-state: ${props => (props.show ? "running" : "paused")};
	}
`;

export default LogoStyled;
