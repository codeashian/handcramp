import styled from "styled-components";
import grid from "tokens/grid.mjs";
import breakpoints from "helpers/breakpoints.mjs";
import mediaQuery from "helpers/mediaQuery";
import spacing from "tokens/spacing.mjs";

const RowStyled = styled.div`
	display: flex;
	box-sizing: content-box;
	flex-flow: row wrap;
	margin: 0 auto;
	width: 100%;
	height: ${props => props.height || "100%"};
	max-width: ${props => (props.full ? "100%" : `${grid.totalWidth}`)};
	justify-content: ${props => props.justifyContent && props.justifyContent};
	${props =>
		props.grid &&
		`
		display: grid;
		grid-template-columns: repeat( auto-fit, minmax(${props.minColWidth ||
			breakpoints.smallMobile}, 1fr) );
		column-gap: ${props.columnGap && props.columnGap};
		row-gap: 100px;
		grid-row-gap: 50px;
	`}

	${mediaQuery.maxContainerWidth`
		margin-bottom: ${props => props.marginBottom || 0};
	`}
`;

export default RowStyled;
