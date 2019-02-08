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

const GameViewStyled = styled.div`
	height: 100%;
	position: relative;

	.GameView-Col {
		position: relative;
	}

	.GameView-Loader,
	.GameView-ResultTitle {
		position: absolute;
		top: 4rem;
		width: 100%;
		text-align: center;

		${media.maxMobile`
		top: 0;

		`}
	}

	.game-view {
		.PlayField-Circle {
			transform: scale(0);
			animation: ${bounceScale} 0.7s ease-in-out forwards 0.4s;
		}

		.buttons {
			opacity: 0;
			width: 80%;
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

	.GameView-ChooseHand {
		text-align: center;
		position: absolute;
		top: -3.5rem;
		z-index: 1;
		-webkit-font-smoothing: antialiased;

		animation: ${slideDown} 0.4s ease forwards 0.6s,
			${fadeOut} 0.4s ease forwards 0.6s;

		&.show {
			opacity: 0;
			animation: ${slideDown} 0.4s ease forwards 0.6s,
				${fadeIn} 0.4s ease forwards 1.6s;
		}

		h5 {
			margin-bottom: 0.5rem;
			-webkit-font-smoothing: antialiased;

			animation: ${bounceOnly()} 0.5s cubic-bezier(0.28, -0.03, 0.85, 0.4)
				alternate infinite;
		}

		svg {
			animation: ${bounceOnly(10)} 0.5s cubic-bezier(0.28, -0.03, 0.85, 0.4)
				alternate infinite;
		}
	}

	.GameView-ButtonArea {
		.animated-button {
			position: absolute;
			animation: ${slideDown} 0.4s ease forwards, ${fadeOut} 0.4s ease forwards;

			&.show {
				opacity: 0;
				animation: ${slideDown} 0.4s ease forwards, ${fadeIn} 0.4s ease forwards;
			}
		}
	}

	.GameView-BackButton {
		position: absolute;
		bottom: 0rem;
		left: 5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		&:hover {
			img {
				transform: translateX(-5px);
			}
		}
		h5 {
			font-size: 0.85rem;
		}

		img {
			width: 8px;
			transition: transform 0.4s ease;
			margin-right: 1rem;
		}
	}
`;

export default GameViewStyled;
