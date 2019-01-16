import React from "react";
import PropTypes from "prop-types";

import H4Styled from "./H4Styled";

const H4 = props => <H4Styled {...props}>{props.children}</H4Styled>;

H4.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

H4.defaultProps = {
	// target: '_self'
};

export default H4;
