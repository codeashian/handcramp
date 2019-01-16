import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import ViewStyled from "./ViewStyled";
import { Transition, animated } from "react-spring";

const View = props => (
	<animated.div>
		<ViewStyled>
			<Helmet>
				<title>{props.title}</title>
				<link rel="canonical" href={window.location.href} />
			</Helmet>
			{props.children}
		</ViewStyled>
	</animated.div>
);

View.propTypes = {
	// children: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired
};

export default View;
