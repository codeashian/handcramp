import styled from "styled-components";

import { slideDown, slideUp, fadeOut, fadeIn } from "animations";

const ResultTitleStyled = styled.div`
	position: absolute;
	top: -2rem;
	text-align: center;
	z-index: 1;

	h1 {
		margin-top: 0;
		animation: ${slideUp} 0.4s ease forwards, ${fadeOut} 0.4s ease forwards;
	}

	h5 {
		animation: ${slideDown} 0.4s ease forwards, ${fadeOut} 0.4s ease forwards;
	}

	${props =>
		props.show &&
		`
			h1 {
				margin-top: 0;
				opacity: 0;
				animation: ${slideDown} 0.4s ease forwards, ${fadeIn} 0.4s ease forwards;
			}

			h5 {
				opacity: 0;
				animation: ${slideUp} 0.4s ease forwards, ${fadeIn} 0.4s ease forwards;
			}
		`}
`;

export default ResultTitleStyled;
