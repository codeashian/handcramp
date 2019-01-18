import React from "react";
import PropTypes from "prop-types";

import TitleWaveStyled from "./TitleWaveStyled";

const TitleWave = props => {
	const splitText = props.text.split("");
	return (
		<TitleWaveStyled {...props}>
			{splitText.map((letter, i) => (
				<span key={i} style={{ animationDelay: `${(i + 1) * 50}ms` }}>
					{letter}
				</span>
			))}
		</TitleWaveStyled>
	);
};

TitleWave.propTypes = {
	text: PropTypes.string
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

TitleWave.defaultProps = {
	// target: '_self'
};

export default TitleWave;
