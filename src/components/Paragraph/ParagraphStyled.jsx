import styled from "styled-components";

import fontFamilies from "tokens/fontFamilies.mjs";
import fontSizes from "tokens/fontSizes.mjs";
import colors from "tokens/colors";
import lineHeights from "tokens/lineHeights.mjs";
import fontWeights from "tokens/fontWeights.mjs";

const ParagraphStyled = styled.p`
	font-size: 12px;
	letter-spacing: 2px;
	line-height: ${lineHeights.m};
	color: ${colors.gray1};
	font-weight: ${fontWeights.fontMedium};
	text-transform: ${props => props.uppercase && "uppercase"};
`;

export default ParagraphStyled;
