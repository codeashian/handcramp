import styled, { keyframes } from "styled-components";

const animateIn = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`;

const float = keyframes`
	0% {
		transform: translateY(-20px) translateX(-20px);
	}

	25% {
		transform: translateY(-0px) translateX(-20px);
	}

	100% {
		transform: translateY(-20px) translateX(0px);
	}
`;

const G = styled.g`
	opacity: 0;

	animation: ${animateIn} 0.4s ease forwards,
		${float} ${props => 2000 + props.speed}ms ease-in-out alternate infinite;
	animation-delay: ${props => props.delay}ms;
`;

export default G;
