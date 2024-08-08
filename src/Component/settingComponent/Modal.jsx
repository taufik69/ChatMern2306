import React, { useState } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ModalComponent = ({ onOpenModal, oncloseModal, children }) => {
  return (
    <div>
      <Modal
        isOpen={onOpenModal}
        onRequestClose={oncloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={oncloseModal}
          className=" flex h-10 w-10 items-center justify-center rounded-xl bg-red-950 text-2xl text-white"
        >
          x
        </button>
        {children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
