import React from "react";
import PropTypes from "prop-types";

import ContainerStyled from "./ContainerStyled";

const Container = props => (
	<ContainerStyled {...props}>{props.children}</ContainerStyled>
);

Container.propTypes = {
	gridTemplate: PropTypes.string,
	header: PropTypes.bool
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

Container.defaultProps = {
	// target: '_self'
};

export default Container;
