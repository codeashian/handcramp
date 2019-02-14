import styled from "styled-components";
import mediaQuery from "helpers/mediaQuery";

const BackButtonStyled = styled.div`
	position: absolute;
	top: 1rem;
	left: 1rem;
	cursor: pointer;
	z-index: 1;
	display: flex;
	align-items: center;

	&:hover {
		img {
			transform: translateX(-5px);
		}
	}
	span {
		font-size: 0.75rem;
		text-transform: uppercase;
		font-weight: bold;
	}

	img {
		width: 6px;
		transition: transform 0.4s ease;
		margin-right: 0.6rem;
	}

	${mediaQuery.maxMobile`
		left: 3.8rem;
	`}
`;

export default BackButtonStyled;
