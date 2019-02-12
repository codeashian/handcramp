import styled, { css, keyframes } from "styled-components";

import fontSizes from "tokens/fontSizes.mjs";
import fontFamilies from "tokens/fontFamilies.mjs";
import spacing from "tokens/spacing.mjs";
import colors from "tokens/colors";
import fontWeights from "tokens/fontWeights.mjs";
import mediaQuery from "helpers/mediaQuery";

const fadeScale = keyframes`
	from { opacity: 0; transform: scale(0.8); }
	to: { opacity: 1; transform: scale(1);}
`;

const buttonActiveStyle = css`
	.Button-Shadow {
		transform: scaleY(1.04) translateY(0) translateX(2px);
		opacity: 0;

		${props =>
			props.small
				? `transform: scaleY(1.04) translateY(0) translateX(2px);`
				: `transform: scaleY(1.04) translateY(0) translateX(2px);`}
	}

	.Button-Front {
		transform: translateY(10px) translateX(0px);
		box-shadow: inset ${props => (props.index !== 0 ? "3px" : 0)} 6px 0px
			${props =>
				props.selected || props.dark ? colors.purpleDark : colors.dustPink};
		${props =>
			props.small &&
			` box-shadow: inset ${props.index !== 0 ? "1px" : "0"} 3px 0px
			${props.selected || props.dark ? colors.purpleDark : colors.dustPink};
		`}
		transition: transform 0.2s ease-in, box-shadow 0.2s ease-in 0s;
		background-color: ${props => props.selected && colors.purple};
		color: ${props => props.selected && colors.white};
		position: relative;

		${props =>
			props.small
				? `transform: translateY(5px) translateX(0px)`
				: `transform: translateY(10px) translateX(0px)`}
	}
`;

const ButtonStyled = styled.button`
	position: relative;
	width: ${props => props.width || "11em"};

	max-width: 100%;
	height: ${props => (props.small ? "2.68rem" : "3.5em")};
	-webkit-appearance: none;
	appearance: none;
	font-weight: ${props => props.small && fontWeights.fontBold};
	-moz-appearance: none;
	transition: transform .4s ease, opacity .4s ease;
	cursor: pointer;
	outline: none;
	border: 0;
	padding: 0;
	box-sizing: border-box;
	border-style: inset;
	margin: ${props => props.margin};
	${props =>
		props.circle &&
		`
		width: 50px;
		height: 50px;
		border-radius: 100%;
	`}
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

	${mediaQuery.maxMobile`
		height: ${props => (props.small ? "2.68rem" : "5.6em")};	
		width: ${props => props.width || "17em"};
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
		border: 2px solid ${colors.borderColor};
		border-radius: ${spacing.buttonBorderRadius};
		color: ${props => (props.dark ? colors.white : colors.black)};
		justify-content: center;
		display: flex;
		align-items: center;
		font-size: ${fontSizes.m};
		font-family: ${fontFamilies.fontSemibold};
		transition: 0.2s ease;
		text-transform: uppercase;
		letter-spacing: 2px;
		z-index: 1;
	}

	.Button-Back {
		background-color: ${props =>
			props.dark ? colors.purpleDark : colors.dustPink};
		transform: translateY(${props => (props.small ? "5px" : "10px")});
	}

	.Button-Front {
		background-color: ${props => (props.dark ? colors.purple : colors.white)};
		overflow: hidden;
		font-weight: ${fontWeights.fontBold};

		transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
		font-size: ${props => (props.smallFont || props.small ? "0.75rem" : "1.25rem")};

		${props =>
			props.selected &&
			`	
			&:before {
				content: "";
				position: absolute;
				display: block;
				height: 3rem;
    		width: 3rem;
				border-radius: 100%;
				background-color: ${colors.purpleLight};
				color: white;

				${props.text && "content: none"}
			}
		`}
	}

	.Button-Shadow {
		border: 0;
		transition: 0.2s ease 0.1s;
		display: block;
		background-color: ${colors.pink};
		left: 0.5rem;
		transform: scaleY(1.04) translateY(${props =>
			props.small ? "10px" : "18px"}) translateX(${props =>
	props.small ? "-4px" : "0"});
	}

	${props =>
		!props.selected && !props.noHover
			? `
		&:hover {
			.Button-Front {
				${
					props.small
						? `transform: translateY(2px) translateX(0px);`
						: `transform: translateY(5px) translateX(0px);`
				}
			}

			.Button-Shadow {
				${
					props.small
						? `transform: translateY(8px) translateX(-4px);`
						: `transform: translateY(15px) translateX(0px);`
				}
			}
		}
	
	`
			: false}

	&.active,
	&:active {
		${props => !props.noHover && buttonActiveStyle}
	}

	${props => props.selected && buttonActiveStyle};
	${props =>
		props.disabled &&
		`
		pointer-events: none;
	`};

	img {
		position: relative;
		height: 2.5rem;
    max-width: 1.7rem;
    position: relative;
    object-fit: contain;

		/* ${mediaQuery.maxMobile`
		height: ${props => (props.small ? "3rem" : "5.6em")};	
		`} */
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
		font-weight: ${fontWeights.fontMedium};
		font-size: 16px;
		transform: scale(0.7);
		padding: 10px;

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
