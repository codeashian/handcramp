import styled from "styled-components";

import grid from "tokens/grid.mjs";
import mediaQuery from "helpers/mediaQuery";

const ColStyled = styled.div`
	max-width: 100%;
	flex-grow: 0;
	flex-shrink: 0;
	flex-basis: 100%;
	flex-direction: column;
	display: ${props => props.flex && "flex"};
	align-items: ${props => props.alignItems && props.alignItems};
	justify-content: ${props => props.justifyContent && props.justifyContent};
	text-align: ${props => props.textAlign && props.textAlign};
	align-self: ${props => props.alignSelf && props.alignSelf};
	${props =>
		props.sizes &&
		Object.keys(props.sizes).map(
			size =>
				mediaQuery[size]`
				flex-basis: calc(100% / ${grid.columnsCount} * ${props.sizes[size]});
			`
		)}
`;

export default ColStyled;
