import styled from "styled-components";

import {
	slideDown,
	slideUp,
	fadeOut,
	fadeIn,
	bounceOnly,
	bounceScale,
	slideDownBounce
} from "animations";
import media from "../../helpers/mediaQuery";

const GameWrapperStyled = styled.div`
	height: 100%;
	position: relative;

	.GameView-Col {
		position: relative;
	}

	.GameView-Loader,
	.GameView-ResultTitle {
		position: absolute;
		top: 1rem;
		width: 100%;
		text-align: center;

		${media.maxMobile`
			top: 0;
		`}
	}

	.game-view {
		.PlayField-Circle {
			transform: scale(0);
			will-change: transform, opacity;
			animation: ${bounceScale} 0.7s ease-in-out forwards 0.4s;
		}

		.buttons {
			opacity: 0;
			width: 80%;
			animation: ${slideUp} 0.4s ease forwards 0.5s,
				${fadeIn} 0.4s ease forwards 0.5s;
				will-change: transform, opacity;

		}

		.game-loader {
			opacity: 0;
			animation: ${slideDown} 0.4s ease forwards 0.6s,
				${fadeIn} 0.4s ease forwards 1.6s;
				will-change: transform, opacity;

		}

		.hand-left {
			opacity: 0;
			animation: ${slideDownBounce} 0.6s ease-in-out forwards 1.2s,
				${fadeIn} 0.3s ease forwards 1.2s;
			will-change: transform, opacity;

		}

		.hand-right {
			opacity: 0;
			animation: ${slideDownBounce} 0.6s ease-in-out forwards 1s,
				${fadeIn} 0.3s ease forwards 2s;
			will-change: transform, opacity;

		}
	}

	.GameView-ChooseHand {
		text-align: center;
		position: absolute;
		top: -2.5rem;
		z-index: 1;
		-webkit-font-smoothing: antialiased;
		pointer-events: none;
		will-change: transform, opacity;

		animation: ${slideDown} 0.4s ease forwards 0.6s,
			${fadeOut} 0.4s ease forwards 0.6s;

		&.show {
			pointer-events: auto;
			opacity: 0;
			will-change: transform, opacity;
			animation: ${slideDown} 0.4s ease forwards 0.6s,
				${fadeIn} 0.4s ease forwards 1.6s;
		}

		h5 {
			margin-bottom: 0.5rem;
			-webkit-font-smoothing: antialiased;
			will-change: transform, opacity;
			animation: ${bounceOnly()} 0.5s cubic-bezier(0.28, -0.03, 0.85, 0.4)
				alternate infinite;
		}

		svg {
			will-change: transform, opacity;
			animation: ${bounceOnly(10)} 0.5s cubic-bezier(0.28, -0.03, 0.85, 0.4)
				alternate infinite;
		}
	}

	.GameView-ButtonArea {
		.animated-button {
			position: absolute;
			/* animation: ${slideDown} 0.4s ease forwards, ${fadeIn} 0.4s ease forwards; */
			z-index: -1;
			opacity: 0;
			transform: translateY(20px);
			will-change: transform, opacity;
			transition: transform 0.4s ease, opacity 0.4s ease;
			&.replay {
				margin-top: 3rem;
				transform: translateY(-20px);
				
			}

			&.show {
				z-index: 1;
				transform: translateY(0);
				opacity: 1;
			}
		}
	}
`;

export default GameWrapperStyled;
