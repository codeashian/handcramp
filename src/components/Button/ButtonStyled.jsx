import styled, { css, keyframes } from "styled-components";

import fontSizes from "tokens/fontSizes.mjs";
import fontFamilies from "tokens/fontFamilies.mjs";
import spacing from "tokens/spacing.mjs";
import colors from "tokens/colors";

const fadeScale = keyframes`
	from { opacity: 0; transform: scale(0.8); }
	to: { opacity: 1; transform: scale(1);}
`;

const buttonActiveStyle = css`
	.Button-Shadow {
		transform: scaleY(1.04) translateY(0) translateX(2px);
		opacity: 0;
	}

	.Button-Front {
		transform: translateY(10px) translateX(0px);
		box-shadow: inset ${props => (props.index !== 0 ? "10px" : 0)} 6px 0px
			${props => (props.selected ? colors.purpleDark : colors.dustPink)};
		transition: transform 0.2s ease-in, box-shadow 0.2s ease-in 0s;
		background-color: ${props => props.selected && colors.purple};
		position: relative;
	}
`;

const ButtonStyled = styled.button`
	position: relative;
	width: ${props => props.width || "17em"};
	max-width: 100%;
	height: ${props => (props.small ? "3.125em" : "4.7em")};
	-webkit-appearance: none;
	appearance: none;
	-moz-appearance: none;
	cursor: pointer;
	outline: none;
	border: 0;
	padding: 0;
	box-sizing: border-box;
	border-style: inset;
	margin: ${props => props.margin};
	${props =>
		props.animation &&
		`
		opacity: 0;
		${props.show &&
			`
			opacity: 1;
			animation: ${fadeScale} .5s ease forwards;
		`}
	`}

	.Button-Shadow,
	.Button-Back,
	.Button-Front {
		pointer-events: none;
		position: absolute;
		left: 0px;
		top: -2px;
		width: 100%;
		box-sizing: border-box;
		height: 100%;
		background-color: ${colors.white};
		border: 2px solid ${colors.borderColor};
		border-radius: ${spacing.buttonBorderRadius};
		color: ${colors.black};
		justify-content: center;
		display: flex;
		align-items: center;
		font-size: ${fontSizes.m};
		font-family: ${fontFamilies.fontSemibold};
		background-color: ${colors.blue};
		transition: 0.2s ease;
		text-transform: uppercase;
		letter-spacing: 2px;
		z-index: 1;
	}

	.Button-Back {
		background-color: ${colors.dustPink};
		transform: translateY(10px);
	}

	.Button-Front {
		background-color: ${colors.white};
		overflow: hidden;
		transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
		font-size: ${props =>
			props.smallFont || props.small ? "0.75rem" : "1.25rem"};

		${props =>
			props.selected &&
			`	
			&:before {
				content: "";
				position: absolute;
				display: block;
				height: 45px;
				width: 45px;
				border-radius: 100%;
				background-color: ${colors.purpleLight};
			}
		`}
	}

	.Button-Shadow {
		border: 0;
		transition: 0.2s ease 0.1s;
		display: block;
		background-color: ${colors.pink};
		left: 0;
		transform: scaleY(1.04) translateY(18px) translateX(0px);
	}

	${props =>
		!props.selected
			? `
		&:hover {
			.Button-Front {
				transform: translateY(5px) translateX(0px);
			}

			.Button-Shadow {
				transform: translateY(15px) translateX(0px);
			}
		}
	
	`
			: false}

	&.active,
	&:active {
		${buttonActiveStyle}
	}

	${props => props.selected && buttonActiveStyle};
	${props =>
		props.disabled &&
		`
		pointer-events: none;
	`};

	img {
		height: 70%;
		max-width: 30px;
		position: relative;
	}

	input {
		appearance: none;
		border: 0;
		box-shadow: none;
		width: 100%;
		text-align: center;
		outline: none;
		letter-spacing: 2px;
		user-select: none;
		font-size: ${props => (props.smallFont ? "0.75rem" : "1.25rem")};

		&:focus,
		&:active,
		&:hover {
			outline: transparent;
		}

		::selection {
			background: ${colors.purple}; /* WebKit/Blink Browsers */
		}
	}
`;

export default ButtonStyled;
