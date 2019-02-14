import styled from "styled-components";

import lineHeights from "tokens/lineHeights.mjs";
import fontWeights from "tokens/fontWeights.mjs";
import colors from "tokens/colors";
import media from "helpers/mediaQuery";

const H5Styled = styled.h5`
	font-size: 0.875rem;
	line-height: ${lineHeights.xs};
	font-weight: ${fontWeights.fontBold};
	letter-spacing: 3px;
	text-align: ${props => (props.center ? "center" : "")};
	text-transform: uppercase;
	color: ${colors.fontColor};
`;

export default H5Styled;
