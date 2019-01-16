import React from "react";
import PropTypes from "prop-types";

import grid from "../../../tokens/grid.mjs";
import ColStyled from "./ColStyled";

const Col = props => (
	<ColStyled className="col" {...props}>
		{props.children}
	</ColStyled>
);

Col.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element,
		PropTypes.array
	]).isRequired,
	sizes: PropTypes.shape({
		breakpoint: PropTypes.number
	}),
	alignItems: PropTypes.string,
	alignSelf: PropTypes.string,
	flex: PropTypes.bool,
	className: PropTypes.string,
	centerContent: PropTypes.bool
};

Col.defaultProps = {
	sizes: {
		smallMobile: grid.columnsCount
	},
	className: "",
	flex: true,
	alignItems: "center"
};

export default Col;
