import React from "react";
import PropTypes from "prop-types";

import H5Styled from "./H5Styled";

const H5 = props => <H5Styled {...props}>{props.children}</H5Styled>;

H5.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

H5.defaultProps = {
	// target: '_self'
};

export default H5;
