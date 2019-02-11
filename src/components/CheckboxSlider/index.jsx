import React, { useState, useEffect } from "react";
import PropTypes, { element } from "prop-types";
import Button from "components/Button";
import CheckboxSliderStyled from "./CheckboxSliderStyled";

const CheckboxSlider = props => {
	const [dragging, setDragging] = useState(false);
	const [startValue, setStartValue] = useState(0);
	const [isOn, setIsOn] = useState(false);

	let handle = false;

	const move = move => {
		const handle = document.querySelector(".handle");
		const line = document.querySelector(".line");
		const bounds = line.getBoundingClientRect();
		const value = move ? bounds.width - 25 : -25;
		handle.style.transform = `translateX(${value}px) translateY(-50%)`;
	};

	const toggleValue = value => {
		if (value) {
			setIsOn(value === "on" ? true : false);
			move(value === "on" ? true : false);
		} else {
			setIsOn(!isOn);
			move(!isOn);
		}
	};

	useEffect(() => {
		if (!handle) {
			return;
		}

		const line = document.querySelector(".line");

		line.onclick = () => toggleValue();

		handle.onpointerdown = e => {
			setDragging(true);
			setStartValue(e.clientX);
		};

		handle.onpointermove = e => {
			if (dragging === true) {
				if (!isOn && startValue < e.clientX) {
					setIsOn(true);
					move(true);
				}

				if (isOn && startValue > e.clientX) {
					setIsOn(false);
					move(false);
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
		<CheckboxSliderStyled {...props} isOn={isOn}>
			<label onClick={() => toggleValue("off")}> {props.offText} </label>

			<div ref={ref => (handle = ref)} className={`handle`}>
				<Button circle disabled />
			</div>
			<div className="line" />
			<label onClick={() => toggleValue("on")}> {props.onText} </label>
		</CheckboxSliderStyled>
	);
};

CheckboxSlider.propTypes = {
	handleChange: PropTypes.func,
	onText: PropTypes.string,
	offText: PropTypes.string
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
	onText: "Best of three",
	offText: "Casual Mode"
	// target: '_self'
};

export default CheckboxSlider;
