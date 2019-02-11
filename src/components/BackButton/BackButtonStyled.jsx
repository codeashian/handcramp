import styled from "styled-components";

const BackButtonStyled = styled.div`
	position: absolute;
	top: 0rem;
	left: 2rem;
	cursor: pointer;
	z-index: 1;
	display: flex;
	align-items: center;
	&:hover {
		img {
			transform: translateX(-5px);
		}
	}
	h5 {
		font-size: 0.85rem;
	}

	img {
		width: 8px;
		transition: transform 0.4s ease;
		margin-right: 1rem;
	}
`;

export default BackButtonStyled;
