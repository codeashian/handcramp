import React from "react";
import PropTypes from "prop-types";
import LogoStyled from "./LogoStyled";

const Logo = props => (
	<LogoStyled {...props}>
		<div>
			<img
				className="mobile-icon mobile-icon--top"
				src="./assets/icons/mobile-top-hands.svg"
			/>
			<img className="logo-img" src="./assets/icons/Logo-Outlines.svg" />
			<a target="_blank" href="https://humblebee.se">
				<img className="lab-logo" src="./assets/icons/hb-lab-logo.svg" />
			</a>
			<img
				className="mobile-icon mobile-icon--bottom"
				src="./assets/icons/mobile-bottom-hands.svg"
			/>
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
