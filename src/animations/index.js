import { keyframes } from "styled-components";

export const fadeOut = keyframes`
	from: { opacity: 1; }
	to { opacity: 0; }
`;

export const fadeIn = keyframes`
	from: { opacity: 0; }
	to { opacity: 1; }
`;

export const slideDown = keyframes`
	from { transform: translateY(-40px); }
	to { transform: translateY(0px); }
`;

export const slideUp = keyframes`
	from { transform: translateY(40px); }
	to { transform: translateY(0px); }
`;

export const scissorsAnimation = keyframes`
	from {
		opacity: 0;
		transform: rotate(-50deg) translateX(50%) translateY(64%) scaleX(-1);
	} 
	to {
		opacity: 1;
		transform: rotate(-50deg) translateX(50%) translateY(0%) scaleX(-1);
	}
`;

export const paperAnimation = keyframes`
	from {
		opacity: 0;
		transform: rotate(180deg) translateX(50%) translateY(100%);

	} 
	to {
		opacity: 1;
		transform: rotate(180deg) translateX(50%) translateY(50%);
	}
`;

export const rockAnimation = keyframes`
	from {
		opacity: 0;
		transform: rotate(50deg) translateX(-50%) translateY(64%) scaleX(-1);

	} 
	to {
		opacity: 1;
		transform: rotate(50deg) translateX(-50%) translateY(0%) scaleX(-1);

	}
`;

export const fadeInCircle = keyframes`
	from {
		opacity: 0;
		transform: translateX(-50%) translateY(-30%);

	} 
	to {
		opacity: 1;
		transform: translateX(-50%) translateY(-50%);
	}
`;

export const fadeScale = keyframes`
	from { opacity: 0; transform: scale(0.8); }
	to: { opacity: 1; transform: scale(1);}
`;
