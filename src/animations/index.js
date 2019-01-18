import { keyframes } from "styled-components";

export const fadeOut = keyframes`
	from: { opacity: 1; }
	to { opacity: 0; }
`;

export const bounceScale = keyframes`
	0% { transform: scale(0); }
	25% { transform: scale(1.2); }
	50% { transform: scale(1); }
	75% { transform: scale(1.1); }
	100% { transform: scale(1); }
`;

export const bounce = keyframes`
0%,100%{ transform:translate(0); }
25%{ transform:rotateX(20deg) translateY(2px) rotate(-3deg); }
50%{ transform:translateY(-20px) rotate(3deg) scale(1.1);  }
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

export const slideDownALot = keyframes`
	from { transform: translateY(-300px); }
	to { transform: translateY(0px); }
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

export const slideDownBounce2 = keyframes`
		0% { transform: translateY(-400px); }
		25% { transform: translateY(60px); }
		50% { transform: translateY(-40px); }
		75% { transform: translateY(15px); }
		100% { transform: translateY(0px);  }
`;

export const slideDownBounce = keyframes`
		0% { transform: translateY(-400px) rotate(38deg); }
		25% { transform: translateY(400px) rotate(-38deg); }
		50% { transform: translateY(-100px) rotate(14deg); }
		75% { transform: translateY(100px) rotate(-14deg); }
		100% { transform: translateY(0px) rotate(0);  }
`;
