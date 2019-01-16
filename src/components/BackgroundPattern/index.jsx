import React, { Fragment } from "react";
import PropTypes from "prop-types";

import BackgroundPatternStyled, { IconStyled } from "./BackgroundPatternStyled";
import SvgRoot from "./SvgRoot";
import G from "./Path";
import paths from "./paths";

class BackgroundPattern extends React.Component {
	constructor() {
		super();
		this.state = {
			y: 0,
			x: 0
		};
	}
	componentDidMount() {
		this.setMouseOrigin(this.pattern);
		document.body.addEventListener("mousemove", this.handleMouseMove);
	}

	componentWillUnmount = () => {
		document.body.removeEventListener("mousemove", this.handleMouseMove);
	};

	handleMouseMove = e => {
		const paths = this.pattern.querySelectorAll(".icon");
		const x = this.state.x - e.clientX;
		const y = this.state.y - e.clientY;
		for (const path of paths) {
			this.moveItem(path, x, y);
		}
		// this.updatePosition(e);
	};

	setMouseOrigin = el => {
		this.setState({
			x: el.offsetLeft + Math.floor(el.offsetWidth / 2),
			y: el.offsetTop + Math.floor(el.offsetHeight / 2)
		});
	};

	moveItem = (el, x, y) => {
		el.style.transform = `translateX(${x * 0.05}px) translateY(${y * 0.05}px)`;
	};

	render() {
		return (
			<BackgroundPatternStyled {...this.props}>
				<div ref={ref => (this.pattern = ref)}>
					<SvgRoot>
						{paths.map((item, i) => {
							return (
								<g key={item.key} className="icon">
									<G key={item.key} speed={i * 200} delay={(i + 1) * 100}>
										{item}
									</G>
								</g>
							);
						})}
					</SvgRoot>
				</div>
			</BackgroundPatternStyled>
		);
	}
}

BackgroundPattern.propTypes = {
	onAnimationEnd: PropTypes.func
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

BackgroundPattern.defaultProps = {
	onAnimationEnd: () => {}
	// target: '_self'
};

export default BackgroundPattern;
