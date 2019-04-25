import React from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";

function useModal(selector = "#app") {
  useEffect(() => {
    if (typeof window !== undefined) {
      ReactModal.setAppElement(selector);
    }
  }, [selector]);
}

const Modal = ({
  isOpen = true,
  onRequestClose,
  children,
  shouldCloseOnOverlayClick = true
}) => {
  useModal();
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={onRequestClose}
      style={ModalStyles}
    >
      {children}
    </ReactModal>
  );
};

const ModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 900
  },
  content: {
    // http://lynn.io/2014/02/22/modalin/
    position: "fixed",
    maxHeight: "calc(100% - 100px)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    // position: "absolute",
    // top: "40px",
    // left: "0px",
    // right: "auto",
    // bottom: "40px",
    border: "",
    background: "black",
    borderRadius: 0,
    zIndex: 1000
  }
};

export default Modal;
