import React from "react";
import PropTypes from "prop-types";
import Circle from "components/Circle";
import LogoStyled from "./LogoStyled";
import colors from "../../../tokens/colors";
import H3 from "components/H3";

const Logo = props => (
	<LogoStyled {...props}>
		<div>
			<img src="./assets/icons/Logo-Outlines.svg" />
		</div>
	</LogoStyled>
);

Logo.propTypes = {
	show: PropTypes.bool
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

Logo.defaultProps = {
	// target: '_self'
};

export default Logo;
