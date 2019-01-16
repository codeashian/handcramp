import styled from "styled-components";

const GameHeaderStyled = styled.div`
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	padding: 5rem;

	> * {
		width: 100%;

		&:last-child {
			text-align: right;
		}

		&:nth-child(2) {
			text-align: center;
		}
	}
`;

export default GameHeaderStyled;
