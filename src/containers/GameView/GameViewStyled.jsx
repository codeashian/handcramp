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

const GameViewStyled = styled.div`
	height: 100%;
	position: relative;

	.GameView-Col {
		position: relative;
	}

	.GameView-Loader,
	.GameView-ResultTitle {
		position: absolute;
		top: 0;
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
`;

export default GameViewStyled;
