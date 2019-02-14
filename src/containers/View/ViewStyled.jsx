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

const fadeScale = keyframes`
	from { opacity: 0; transform: scale(0.8); }
	to: { opacity: 1; transform: scale(1);}
`;

const ViewStyled = styled.main`
	width: 100%;
	max-width: 100%;
	height: 100%;
	max-height: 100vh;
	/* min-height: 100vh; */
	margin: 0 auto;
	position: fixed;
	box-sizing: border-box;
	overflow: hidden;
	background-color: ${colors.lightPink};
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	position: fixed;
	top: 0;

	> * {
		transition: 0.4s ease;
	}

	.footer {
		margin: 1rem 0;
		font-size: 12px;
		font-weight: bold;
		color: #9d76f1;
		letter-spacing: 3px;
		text-align: center;
		position: absolute;
		bottom: 0;
		width: 100%;

		a {
			font-weight: bold;
			color: #9d76f1;
			text-decoration: none;
		}
	}

	.start-wrapper {
		> div,
		.button,
		.circle > * {
			text-align: center;
			transition: 0.4s ease;
		}

		.button {
			transform: translateY(120px) translateX(-50%);
			position: absolute;
			/* width: 100%; */
			left: 50%;

			> button {
				opacity: 0;
				/* position: absolute; */
				animation: ${slideDown} 0.4s ease forwards 2000ms,
					${fadeIn} 0.4s ease forwards 2000ms;
			}
		}

		> div:first-child {
			transition-duration: 0.4s;
		}
	}
	.icon {
		/* transition: 0.8s ease; */
	}

	.start-view {
		h2 {
			transition: transform 0.4s ease, opacity 0.4s ease;
		}

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

	.pregame-view {
		.animate {
			opacity: 0;
			animation: ${slideUp} 0.4s ease forwards 0.4s,
				${fadeIn} 0.4s ease forwards 0.4s;
		}

		${Array.from(Array(5).keys()).map(key => {
			return `.animate:nth-child(${key}) {
				animation-delay: ${key * 100 + 300}ms;
			}`;
		})}

		.input-message {
			position: relative;
			width: 100%;
			margin: 1rem 0;
			height: 3rem;

			> * {
				position: absolute;
				width: 100%;
				left: 50%;
				text-align: center;
				transform: translateX(-50%);
			}
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

		.start-view {
			h2,
			button {
				transform: translateY(30px);
				opacity: 0;
			}
		}
	}
`;

export default ViewStyled;
