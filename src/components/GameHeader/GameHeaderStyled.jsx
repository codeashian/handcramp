import styled, { keyframes } from "styled-components";

const expand = keyframes`
	0% {
		transform: scale(1);

	}


	50% {
		transform: scale(2);
	}

	100% {
		transform: scale(1);
	}
`;

const GameHeaderStyled = styled.div`
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	padding: 5rem;

	> * {
		width: 100%;

		p {
			display: inline-block;
			/* position: absolute; */
			bottom: 0;
		}

		&:last-child {
			text-align: right;
		}

		&:nth-child(2) {
			text-align: center;
		}
	}
`;

export const Score = styled.p`
	animation: ${expand} 0.4s ease;
`;
export default GameHeaderStyled;
