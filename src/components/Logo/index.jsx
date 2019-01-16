import React from "react";
import PropTypes from "prop-types";
import Circle from "components/Circle";
import LogoStyled from "./LogoStyled";
import colors from "../../../tokens/colors";
import H3 from "components/H3";

const Logo = props => (
	<LogoStyled {...props}>
		<Circle className="circle" bg={colors.pink}>
			<div>
				<H3>FIST FIGHT</H3>
				<img className="paper" src="./assets/icons/paper.svg" />
				<img className="rock" src="./assets/icons/rock.svg" />
				<img className="scissors" src="./assets/icons/scissors.svg" />
			</div>
		</Circle>
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
