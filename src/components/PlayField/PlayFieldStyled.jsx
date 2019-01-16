import styled from "styled-components";

import colors from "tokens/colors";

const PlayFieldStyled = styled.div`
	position: relative;
	width: 600px;

	.PlayField-Circle {
		width: 18.75rem;
		height: 18.75rem;
		background-color: ${colors.purple};
		border-radius: 100%;
		margin: 0 auto;
	}

	.PlayField-Hand {
		position: absolute;
		top: 0;
		pointer-events: none;
		/* width: 600px;
		height: 600px; */
	}

	.PlayField-Hand--Left {
		left: 0;
		transform: scaleX(-1) translateX(40%) translateY(-20%);
	}

	.PlayField-Hand--Right {
		right: 0;
		transform: translateX(40%) translateY(-20%);
	}

	.PlayField-Result {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
`;

export default PlayFieldStyled;
