import styled from "styled-components";

import fontSizes from "tokens/fontSizes.mjs";
import lineHeights from "tokens/lineHeights.mjs";
import fontWeights from "tokens/fontWeights.mjs";
import colors from "tokens/colors";

const H3Styled = styled.h3`
	font-size: ${fontSizes.h3};
	line-height: ${lineHeights.xs};
	font-weight: ${fontWeights.fontLight};
	letter-spacing: 8px;
	text-align: ${props => (props.center ? "center" : "")};
	text-transform: ${props => props.uppercase && "uppercase"};
	color: ${colors.fontColor};
`;

export default H3Styled;
