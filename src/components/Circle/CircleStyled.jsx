import styled from "styled-components";

import colors from "tokens/colors";

const CircleStyled = styled.div`
	width: 18.75rem;
	height: 18.75rem;
	background-color: ${props => props.bg || colors.purple};
	border-radius: 100%;
	margin: 0 auto;
	position: relative;
`;

export default CircleStyled;
