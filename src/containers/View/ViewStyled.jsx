import styled, { keyframes } from "styled-components";
import colors from "tokens/colors";
import {
	slideDown,
	slideUp,
	fadeOut,
	fadeIn,
	bounceScale,
	slideDownBounce
} from "animations";

const ViewStyled = styled.main`
	width: 100%;
	max-width: 100%;
	height: 100vh;
	min-height: 100vh;
	max-height: 100vh;
	margin: 0 auto;
	box-sizing: border-box;
	overflow-x: hidden;
	background-color: ${colors.lightPink};
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;

	> * {
		transition: 0.4s ease;
	}

	.start-wrapper {
		> div,
		.button,
		.circle > * {
			text-align: center;
			transition: 0.4s ease;
		}

		> div:first-child {
			transition-duration: 0.4s;
		}
	}
	.icon {
		transition: 0.8s ease;
	}

	.start-view {
		> div {
			opacity: 0;
		}
		> div:first-child {
			animation: ${slideDown} 0.4s ease forwards 0.4s,
				${fadeIn} 0.4s ease forwards 0.4s;
		}
		> div:last-child {
			animation: ${slideUp} 0.4s ease forwards 0.8s,
				${fadeIn} 0.4s ease forwards 0.8s;
		}
	}

	.game-view {
		.PlayField-Circle {
			transform: scale(0);
			animation: ${bounceScale} 0.7s ease-in-out forwards 0.4s;
		}

		.buttons {
			opacity: 0;
			animation: ${slideUp} 0.4s ease forwards 0.5s,
				${fadeIn} 0.4s ease forwards 0.5s;
		}

		.game-loader {
			opacity: 0;
			animation: ${slideDown} 0.4s ease forwards 0.6s,
				${fadeIn} 0.4s ease forwards 1.6s;
		}

		.hand-left {
			opacity: 0;
			animation: ${slideDownBounce} 0.6s ease-in-out forwards 1.2s,
				${fadeIn} 0.3s ease forwards 1.2s;
		}

		.hand-right {
			opacity: 0;
			animation: ${slideDownBounce} 0.6s ease-in-out forwards 1s,
				${fadeIn} 0.3s ease forwards 2s;
		}
	}

	&.animate-out {
		.start-wrapper {
			.button {
				opacity: 0;
			}

			> div:first-child {
				transform: translateX(-100%);
				opacity: 0;
				transition-delay: 200ms;
			}
		}
		.icon {
			transform: translateX(-100%) !important;
			/* opacity: 0; */
			transition-delay: 400ms;
			transition-duration: 400ms;

			&:nth-child(even) {
				transition-delay: 300ms;
			}
		}
	}
`;

export default ViewStyled;
