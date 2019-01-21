import styled from "styled-components";

import fontSizes from "tokens/fontSizes.mjs";
import lineHeights from "tokens/lineHeights.mjs";
import fontWeights from "tokens/fontWeights.mjs";
import colors from "tokens/colors";

const H5Styled = styled.h5`
	font-size: ${fontSizes.h5};
	line-height: ${lineHeights.xs};
	font-weight: ${fontWeights.fontBold};
	letter-spacing: 3.5px;
	text-align: ${props => (props.center ? "center" : "")};
	text-transform: uppercase;
	color: ${colors.fontColor};
`;

export default H5Styled;
