import styled from "styled-components";

import fontSizes from "tokens/fontSizes.mjs";
import lineHeights from "tokens/lineHeights.mjs";
import fontWeights from "tokens/fontWeights.mjs";
import colors from "tokens/colors";

const H2Styled = styled.h2`
	font-size: ${fontSizes.h2};
	line-height: ${lineHeights.xs};
	font-weight: 200;
	letter-spacing: 2px;
	text-align: ${props => (props.center ? "center" : "")};
	color: ${colors.fontColor};
`;

export default H2Styled;
