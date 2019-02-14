import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";

// import AnimatedRouteStyled from "./AnimatedRouteStyled";
import { Transition, animated } from "react-spring";

const AnimatedRoute = ({ children }) => (
	<Route
		render={({ location }) => (
			<Transition
				native
				items={location}
				keys={location => location.pathname}
				from={{
					opacity: 0
				}}
				enter={{
					opacity: 1
				}}
				leave={{
					opacity: 0
				}}
			>
				{location => style => {
					return (
						<animated.div style={style}>{children(location)}</animated.div>
					);
				}}
			</Transition>
		)}
	/>
);

AnimatedRoute.propTypes = {
	children: PropTypes.func
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

AnimatedRoute.defaultProps = {
	// target: '_self'
};

export default AnimatedRoute;
