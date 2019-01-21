import React from "react";
import PropTypes from "prop-types";

import ModalStyled from "./ModalStyled";

const Modal = props => (
	<ModalStyled {...props}>
		<div className="ModalInner">{props.children}</div>
	</ModalStyled>
);

Modal.propTypes = {};

Modal.defaultProps = {};

export default Modal;
