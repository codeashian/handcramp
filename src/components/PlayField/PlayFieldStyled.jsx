import styled from "styled-components";

import colors from "tokens/colors";
import { bounceScale } from "animations";

const PlayFieldStyled = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	height: 18.75rem;

	.PlayField-Circle {
		width: 18.75rem;
		height: 18.75rem;
		background-color: ${colors.purple};
		border-radius: 100%;
		margin: 0 auto;
		position: absolute;
		top: calc(50% - 9rem);

		${props =>
			props.scaleCircle &&
			`
			animation: ${bounceScale} 1700ms ease alternate;
			animation-delay: 1s;
		`}
	}

	.PlayField-Hand {
		position: absolute;
		top: 0;
		pointer-events: none;
		width: 30rem;
	}

	.PlayField-Hand--Left {
		left: 50%;
		transform: scaleX(-1) translateX(80%) translateY(-32%);
	}

	.PlayField-Hand--Right {
		right: 50%;
		transform: translateX(80%) translateY(-32%);
	}

	.PlayField-Result {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);

		.hand-win {
			width: calc(18.75rem * 3);

			svg > g {
				transform: translateX(28%);
			}
		}
	}
`;

export default PlayFieldStyled;
