import React from "react";
import PropTypes from "prop-types";

import CircleStyled from "./CircleStyled";

const Circle = props => (
	<CircleStyled {...props}>{props.children}</CircleStyled>
);

Circle.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

Circle.defaultProps = {
	// target: '_self'
};

export default Circle;
