import styled from "styled-components";

import colors from "tokens/colors";
import spacing from "tokens/spacing.mjs";
import mediaQuery from "helpers/mediaQuery";

const ModalStyled = styled.div`
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	margin-bottom: 0;
	box-sizing: border-box;
	height: 100%;
	font-size: 12px;
	background-color: rgba(33, 53, 72, 0.9);
	z-index: 99999;
	pointer-events: none;
	opacity: 0;
	transition: 0.4s;
	transition-delay: 0.2s;
	${mediaQuery.midMobile`
		font-size: 16px;
	`}

	.ModalInner {
		width: 90%;
		max-width: 400px;
		box-shadow: 0 4px 20px 0 ${colors.fontColor};
		z-index: 1;
		background-color: ${colors.lightPink};
		margin: 0 auto;
		top: 50%;
		transform: translateY(-50%);
		padding: ${spacing.small} ${spacing.small};
		position: relative;
		opacity: 0;
		transition: 0.6s;
		border-radius: 20px;
		text-align: center;
		${mediaQuery.midMobile`
			padding: ${spacing.medium} ${spacing.small};
		`}

		h4 {
			margin: 0;
		}

		p {
			letter-spacing: 1px;
			font-size: 14px;
		}
	}

	${props =>
		props.active &&
		`
		opacity: 1;
		transition-delay: 0s;
		pointer-events: initial;
		.ModalInner {
			opacity: 1;
		}
	
	`}

	.CloseIcon {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: initial;
		width: 40px;
		height: 40px;
		pointer-events: initial;

		&::before,
		&::after {
			content: "";
			position: absolute;
			width: 30px;
			height: 2px;
			background-color: ${colors.orange};
			top: 19px;
		}

		::before {
			transform: rotate(45deg);
		}
		::after {
			transform: rotate(-45deg);
		}
	}
`;

export default ModalStyled;
