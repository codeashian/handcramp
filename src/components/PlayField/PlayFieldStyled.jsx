import styled from "styled-components";

import colors from "tokens/colors";
import { bounceScale, scale } from "animations";
import mediaQuery from "helpers/mediaQuery";

const PlayFieldStyled = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	height: 18.75rem;
	min-height: 26rem;

	.PlayField-Circle {
		width: 18.75rem;
		height: 18.75rem;
		background-color: ${colors.purple};
		border-radius: 100%;
		margin: 0 auto;
		position: absolute;
		top: calc(50% - 9rem);

		&.animate {
			transform: scale(1);
			animation: ${scale} 0.4s cubic-bezier(0.25, 0.1, 0.51, 1.26) forwards;
			animation-delay: 0s;
		}

		${props =>
			props.scaleCircle &&
			`
			animation: ${bounceScale} 1700ms ease alternate;
			animation-delay: 1s;
		`}
	}

	.PlayField-ResultTitle {
		position: absolute;
		top: 0;
		width: 100%;
		text-align: center;
		transform: translateY(-300%);
	}

	.PlayField-Hand {
		position: absolute;
		top: 38%;
		pointer-events: none;
		width: 20rem;

		${mediaQuery.maxMobile`
			width: 30rem;
		`}
	}

	.PlayField-Hand--Left {
		left: 50%;
		transform: scaleX(-1) translateX(100%) translateY(-50%);
	}

	.PlayField-Hand--Right {
		right: 50%;
		transform: translateX(100%) translateY(-50%);
	}

	.PlayField-Result {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		max-height: 18rem;
		overflow: hidden;

		${mediaQuery.midMobile`
			max-height: 21rem;
		`}

		h2 {
			position: absolute;
			width: 100%;
			transform: translateY(-200%);
			text-align: center;
		}

		.hand-win {
			width: calc(14.75rem * 3);

			svg > g {
				transform: translateX(28%);
			}

			${mediaQuery.midMobile`
				width: calc(18.75rem * 3);

			`}
		}

		.hand-lose {
			transform: translateY(0%);
		}

		.hand-lose,
		.hand-draw {
			width: 19rem;

			${mediaQuery.midMobile`
				width: 20rem;
			`}
		}

		.hand-tiepaper {
			width: 27rem;

			${mediaQuery.midMobile`
				width: 31rem;
			`}
		}

		.hand-tierock,
		.hand-tiescissors {
			width: 48rem;

			${mediaQuery.midMobile`
				width: 69rem;
			`}
		}
	}
`;

export default PlayFieldStyled;
