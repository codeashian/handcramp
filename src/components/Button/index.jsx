import React from "react";
import PropTypes from "prop-types";

import ButtonStyled from "./ButtonStyled";

const Button = props => {
	const handleClick = e => {
		e.target.classList.add("active");
		document.querySelector("main").classList.add("animate-out");
		setTimeout(() => {
			props.onClick();
		}, 1000);
	};

	const clickEvent = props.routeChange ? handleClick : props.onClick;

	return (
		<ButtonStyled {...props} onClick={clickEvent} disabled={props.disabled}>
			<div className="Button-Shadow"> </div>
			<div className="Button-Back"> </div>
			<div className="Button-Front">{props.children}</div>
		</ButtonStyled>
	);
};

Button.propTypes = {
	// children: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	margin: PropTypes.string,
	routeChange: PropTypes.bool,
	small: PropTypes.bool
};
Button.defaultProps = {
	disabled: false,
	routeChange: true,
	onClick: () => null
};

export default Button;
