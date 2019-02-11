import React from "react";
import PropTypes from "prop-types";

import JumpingTitleStyled from "./JumpingTitleStyled";
import H5 from "components/H5";

const JumpingTitle = props => (
	<JumpingTitleStyled {...props}>
		<H5>{props.title}</H5>
		<svg width="20" height="11" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0 .645a.68.68 0 0 1 .195-.47A.677.677 0 0 1 .665 0c.181 0 .338.059.468.176L9.96 9.004 18.652.313a.64.64 0 0 1 .47-.196.64.64 0 0 1 .468.196.64.64 0 0 1 .195.468.64.64 0 0 1-.195.469l-9.16 9.16a.64.64 0 0 1-.47.195.64.64 0 0 1-.468-.195L.195 1.133A.639.639 0 0 1 .05.908.728.728 0 0 1 0 .645z"
				fill="#000"
				fillRule="evenodd"
			/>
		</svg>
	</JumpingTitleStyled>
);

JumpingTitle.propTypes = {
	title: PropTypes.string
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

JumpingTitle.defaultProps = {
	// target: '_self'
};

export default JumpingTitle;
