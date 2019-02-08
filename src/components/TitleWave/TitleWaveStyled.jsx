import styled from "styled-components";
import { bounce } from "animations";
import media from "helpers/mediaQuery";

const TitleWaveStyled = styled.div`
	transform: ${props => props.show && "scale(0)"};
	transition: transform 0.4s ease-out;
	margin-bottom: 40px;

	span {
		display: inline-block;
		text-transform: uppercase;
		margin: 2px;
		font-size: 14px;
		animation: ${bounce} 1.3s ease alternate infinite;

		${media.maxMobile`
			font-size: 18px;
		`}
	}
`;

export default TitleWaveStyled;
