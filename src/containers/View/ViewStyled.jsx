import styled, { keyframes } from "styled-components";
import colors from "tokens/colors";
import { slideDown, slideUp, fadeOut, fadeIn } from "animations";

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
			transition: 0.4s ease;
		}

		> div {
			transition-duration: 1s;
		}
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

	&.animate-out {
		.start-wrapper {
			.button {
				opacity: 0;
			}

			.circle > div {
				opacity: 0;
			}

			> div:first-child {
				transform: scale(6);
				transition-delay: 500ms;
			}
		}
	}
`;

export default ViewStyled;
