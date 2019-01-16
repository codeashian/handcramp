import styled from "styled-components";

import spacing from "tokens/spacing.mjs";

const ButtonGroupStyled = styled.div`
	display: flex;
	position: relative;
	z-index: 1;
	max-width: 438px;
	width: 100%;
	margin: ${props => props.margin};

	> button {
		> * {
			border-radius: 0 !important;
		}

		&:first-child > div {
			border-top-left-radius: ${spacing.buttonBorderRadius} !important;
			border-bottom-left-radius: ${spacing.buttonBorderRadius} !important;
		}

		&:last-child > div {
			border-top-right-radius: ${spacing.buttonBorderRadius} !important;
			border-bottom-right-radius: ${spacing.buttonBorderRadius} !important;
		}

		> div {
			/* border-right: 0 !important; */
			border-left-width: 1px !important;

			&:first-child {
				border-left-width: 5px !important;
			}
		}
	}
`;

export default ButtonGroupStyled;
