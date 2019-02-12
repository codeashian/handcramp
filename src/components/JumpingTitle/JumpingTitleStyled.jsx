import styled from "styled-components";

import { bounceOnly } from "animations";

const JumpingTitleStyled = styled.div`
	text-align: center;
	h5 {
		margin-bottom: 0.5rem;
		-webkit-font-smoothing: antialiased;

		animation: ${bounceOnly()} 0.5s cubic-bezier(0.28, -0.03, 0.85, 0.4)
			alternate infinite;
	}

	svg {
		animation: ${bounceOnly(10)} 0.5s cubic-bezier(0.28, -0.03, 0.85, 0.4)
			alternate infinite;

		path {
			transform: scaleY(0.7);
		}
	}
`;

export default JumpingTitleStyled;
