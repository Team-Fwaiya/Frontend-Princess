import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <img
          src={`${process.env.PUBLIC_URL}/icon/close.svg`}
          alt="close"
          style={styles.closeIcon}
          onClick={onClose}
        />
        {children}
      </div>
    </div>,
    modalRoot
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#ffffff",
    padding: "48px",
    borderRadius: "30px",
    minWidth: "300px",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: "32px",
    right: "48px",
    cursor: "pointer",
    width: "24px",
    height: "24px",
  },
};

export default Modal;
