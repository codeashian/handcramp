import styled from "styled-components";

const ContainerStyled = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 5rem;
	padding-top: ${props => props.header && "5rem"};
	${props =>
		props.gridTemplate &&
		`
		display: grid;
		grid-template: ${props.gridTemplate};
	`}
`;

export default ContainerStyled;
