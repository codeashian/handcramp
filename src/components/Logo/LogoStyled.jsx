import styled, { keyframes } from "styled-components";

import colors from "tokens/colors";
import * as animations from "animations";
import media from "../../helpers/mediaQuery";

const LogoStyled = styled.div`
	position: relative;

	> div {
		display: flex;
		flex-direction: column;
	}

	.logo-img {
		width: 200px;
		opacity: 0;
		animation: ${animations.slideDownBounce2} 0.7s ease-in-out forwards 1000ms,
			${animations.fadeIn} 0.4s cubic-bezier(0.9, 0.6, 0.25, 1) forwards 1000ms;

		${media.maxMobile`
			width: 400px;
		`}
	}

	.lab-logo {
		margin-top: 25px;
		opacity: 0;
		animation: ${animations.fadeIn} 0.7s ease-in-out forwards 1900ms;

		/* ${media.maxMobile`
			display: none;
		`} */
	}

	.mobile-icon {
		opacity: 0;
		position: absolute;
		animation: ${animations.fadeIn} 0.7s ease-in-out forwards 1500ms;
		left: 0;
		&--top {
			top: -60%;
		}

		&--bottom {
			bottom: -60%;
		}
		${media.maxMobile`
			display: none;
		`}
	}
`;

export default LogoStyled;
