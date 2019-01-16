import React from "react";
import PropTypes from "prop-types";

import RowStyled from "./RowStyled";

const Row = props => (
	<RowStyled className="row" {...props}>
		{props.children}
	</RowStyled>
);

Row.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
		.isRequired,
	className: PropTypes.string,
	width: PropTypes.string,
	center: PropTypes.bool
};

Row.defaultProps = {
	className: "",
	width: "",
	justifyContent: "center"
};

export default Row;
