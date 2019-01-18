import styled, { keyframes } from "styled-components";

import colors from "tokens/colors";
import * as animations from "animations";

const LogoStyled = styled.div`
	img {
		width: 400px;
		opacity: 0;
		animation: ${animations.slideDownBounce2} 0.7s ease-in-out forwards 1200ms,
			${animations.fadeIn} 0.4s cubic-bezier(0.9, 0.6, 0.25, 1) forwards 1200ms;
	}
`;

export default LogoStyled;
