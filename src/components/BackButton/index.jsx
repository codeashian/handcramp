import React from "react";
import PropTypes from "prop-types";
import H5 from "components/H5";
import BackButtonStyled from "./BackButtonStyled";

const BackButton = props => (
	<BackButtonStyled {...props} onClick={props.handleClick}>
		<img src="./assets/icons/arrow-back.svg" />
		<span>Back</span>
	</BackButtonStyled>
);

BackButton.propTypes = {
	handleClick: PropTypes.func
};

BackButton.defaultProps = {
	// target: '_self'
};

export default BackButton;
