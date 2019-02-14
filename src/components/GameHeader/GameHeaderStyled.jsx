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
		transform: scale(4);
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
	padding: 2.5rem 2rem 2rem;
	height: 100px;

	h5 {
		margin-top: 0;
		font-size: 12px;
	}

	.GameHeader-RoundBox {
		display: flex;
		margin-top: 7px;
		flex-direction: column;
		align-items: center;

		span {
			background-color: ${colors.fontColor};
			border-radius: 12px;
			font-size: 0.875rem;
			font-weight: bold;
			color: ${colors.lightPink};
			display: inline-block;
			/* width: 65px; */
			text-transform: uppercase;
			letter-spacing: 3px;
			padding: 3px 11px;

			&.bestofthree {
				padding: 3px 1rem;
			}

			${mediaQuery.maxMobile`
			padding: 3px 3rem;
			`}
		}
	}

	> * {
		width: 100%;
		position: relative;

		p {
			display: block;
			font-size: 12px;
			letter-spacing: 3px;
			margin-top: 0;
			/* position: absolute; */
		}

		&:last-child {
			text-align: right;
		}

		&:nth-child(2) {
			text-align: center;
		}
	}

	${mediaQuery.midMobile`
			padding: 4rem 2rem 2rem;
			height: 100px;
	`}
	${mediaQuery.maxMobile`
		padding: 4rem 5rem 2rem;
		height: ${spacing.gameHeaderHeight};
	`}
`;

export const Score = styled.p`
	animation: ${expand} 0.4s ease;
	font-size: 20px !important;
	font-weight: bold;
	position: absolute;
	margin: 0;
	${props => props.pos}: 0;

	${props =>
		props.score &&
		`
		animation: ${expand} 0.4s cubic-bezier(0.25, 0.1, 0, 0.75);

	`}
`;
export default GameHeaderStyled;
