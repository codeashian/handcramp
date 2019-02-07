import styled from "styled-components";

import colors from "tokens/colors";

const CheckboxSliderStyled = styled.div`
	width: 6rem;
	position: relative;
	height: 6rem;

	.handle {
		position: absolute;
		top: 50%;
		transform: translateY(-50%) translateX(-50%);
		display: inline-block;
		z-index: 1;
		transition: 0.4s;
		cursor: pointer;

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
		}
	}

	.line {
		height: 5px;
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
