import React, { useState, useEffect } from "react";
import PropTypes, { element } from "prop-types";
import Button from "components/Button";
import CheckboxSliderStyled from "./CheckboxSliderStyled";

const CheckboxSlider = props => {
	const [dragging, setDragging] = useState(false);
	const [startValue, setStartValue] = useState(0);
	const [isOn, setIsOn] = useState(false);

	let handle = false;

	const move = () => {
		const handle = document.querySelector(".handle");
		const line = document.querySelector(".line");
		const bounds = line.getBoundingClientRect();

		const value = !isOn ? bounds.width - 25 : -25;
		handle.style.transform = `translateX(${value}px) translateY(-50%)`;
	};

	useEffect(() => {
		if (!handle) {
			return;
		}

		const line = document.querySelector(".line");

		line.onclick = () => {
			setIsOn(!isOn);
			move();
		};

		handle.onpointerdown = e => {
			setDragging(true);
			setStartValue(e.clientX);
		};

		handle.onpointermove = e => {
			if (dragging === true) {
				if (!isOn && startValue < e.clientX) {
					setIsOn(true);
					move();
				}

				if (isOn && startValue > e.clientX) {
					setIsOn(false);
					move();
				}
			}
		};

		window.onpointerup = e => {
			setDragging(false);
			props.handleChange(isOn);
		};

		return () => {
			window.onpointerup = false;
			window.onpointermove = false;
			window.onpointerdown = false;
			line.onclick = false;
		};
	});

	return (
		<CheckboxSliderStyled {...props}>
			<div ref={ref => (handle = ref)} className={`handle`}>
				<Button circle disabled />
			</div>
			<div className="line" />
		</CheckboxSliderStyled>
	);
};

CheckboxSlider.propTypes = {
	handleChange: PropTypes.func
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	to: PropTypes.string.isRequired
	*/
};

CheckboxSlider.defaultProps = {
	// target: '_self'
};

export default CheckboxSlider;
