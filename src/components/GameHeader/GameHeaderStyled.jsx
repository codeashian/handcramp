import styled, { keyframes } from "styled-components";
import spacing from "tokens/spacing.mjs";
import colors from "tokens/colors";
import fontSizes from "tokens/fontSizes.mjs";
import mediaQuery from "helpers/mediaQuery";

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
	padding: 4rem 2rem 2rem;
	height: 100px;

	h5 {
		margin-top: 15px;
		font-size: 1.25rem !important;
	}

	.GameHeader-RoundBox {
		display: flex;
		flex-direction: column;
		align-items: center;

		span {
			background-color: ${colors.fontColor};
			border-radius: 12px;
			font-size: 14px;
			font-weight: bold;
			color: ${colors.lightPink};
			display: inline-block;
			width: 65px;
		}
	}

	> * {
		width: 100%;
		position: relative;

		p {
			display: block;
			font-size: 12px;
			letter-spacing: 3px;
			/* position: absolute; */
		}

		&:last-child {
			text-align: right;
		}

		&:nth-child(2) {
			text-align: center;
		}
	}
	${mediaQuery.maxMobile`
		padding: 4rem 5rem 2rem;
		height: ${spacing.gameHeaderHeight};
	`}
`;

export const Score = styled.p`
	animation: ${expand} 0.4s ease;
	font-size: 24px !important;
	font-weight: bold;
	position: absolute;
	margin: 0;
	${props => props.pos}: 0;
`;
export default GameHeaderStyled;
