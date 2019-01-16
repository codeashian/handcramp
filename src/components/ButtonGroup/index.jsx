import React from "react";
import PropTypes from "prop-types";

import ButtonGroupStyled from "./ButtonGroupStyled";

const ButtonGroup = props => {
	const numChildren = React.Children.count(props.children);
	return (
		<ButtonGroupStyled buttonLength={numChildren} {...props}>
			{props.children}
		</ButtonGroupStyled>
	);
};

ButtonGroup.propTypes = {
	margin: PropTypes.string
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

ButtonGroup.defaultProps = {
	// target: '_self'
};

export default ButtonGroup;
