import React from "react";

const SvgRoot = props => (
	<svg
		width="1232"
		height="879"
		viewBox="-100 -100 1372 1019"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g fill="#213548" fillRule="evenodd">
			{props.children}
		</g>
	</svg>
);

export default SvgRoot;
