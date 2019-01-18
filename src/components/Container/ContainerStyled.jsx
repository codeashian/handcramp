import styled from "styled-components";
import mediaQuery from "helpers/mediaQuery";

const ContainerStyled = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 2rem;
	padding-top: ${props => props.header && "5rem"};
	${props =>
		props.gridTemplate &&
		`
		display: grid;
		grid-template: ${props.gridTemplate};
	`}

	${mediaQuery.maxMobile`
		padding: 5rem;
	`}
`;

export default ContainerStyled;
