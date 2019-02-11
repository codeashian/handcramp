import styled from "styled-components";

import colors from "tokens/colors";
import fontFamilies from "tokens/fontFamilies.mjs";
import media from "../../helpers/mediaQuery";

const CheckboxSliderStyled = styled.div`
	width: 6rem;
	position: relative;
	height: 6rem;

	label {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		text-transform: uppercase;
		font-size: 0.76rem;
		font-family: ${fontFamilies.fontRegular};
		letter-spacing: 1px;
		cursor: pointer;
		transition: 0.1s ease;
		-webkit-tap-highlight-color: transparent;

		&:first-child {
			${props => !props.isOn && "font-weight: bold;"}
			left: calc(-100% - 3.5rem);
		}

		&:last-child {
			${props => props.isOn && "font-weight: bold;"}
			right: calc(-100% - 3.5rem);
		}
	}

	.handle {
		position: absolute;
		top: 50%;
		transform: translateY(-50%) translateX(-50%);
		display: inline-block;
		z-index: 1;
		transition: 0.4s;
		cursor: pointer;
		touch-action: none;

		button {
			width: 50px;
			height: 50px;
		}

		&:after {
			content: "";
			width: 6px;
			border-radius: 100%;
			height: 6px;
			transform: translateY(-50%) translateX(-50%);
			background-color: black;
			position: absolute;
			top: 44%;
			left: 50%;
			z-index: 1;
		}

		&.active {
			transform: translateY(-50%) translateX(100%);
		}

		.Button-Back {
			transform: translateY(5px);
		}

		.Button-Shadow {
			transform: scaleY(1.04) translateY(9px) translateX(0px);
			display: none;
		}
	}

	.line {
		height: 6px;
		border-radius: 5px;
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background-color: black;
		cursor: pointer;
	}
`;

export default CheckboxSliderStyled;
