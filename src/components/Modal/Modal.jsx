import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const { onClose } = this.props;

    if (e.code === "Escape") {
      onClose();
    }
  };

  handleBackdropClick = (e) => {
    const { onClose } = this.props;

    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  render() {
    const { children } = this.props;
    const { handleBackdropClick } = this;

    return createPortal(
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propType = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
