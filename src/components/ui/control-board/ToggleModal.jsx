import React, { useState } from "react";
import { Modal } from "antd";

const ToggleModal = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const btnStyle = {
    width: "15px",
    height: "15px",
    backgroundColor: "#DDE2E8",
    borderRadius: "2px",
    lineHeight: "15px",
    textAlign: "center",
    cursor: "pointer",
  };
  return (
    <div className="flex gap-1 itemes center">
      {children}
      <span style={btnStyle} onClick={() => setModalOpen(true)}>
        +
      </span>
      <span style={{ ...btnStyle, lineHeight: "12px" }}>-</span>
      <Modal
        title="20px to Top"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        okText="submit"
        cancelText="cancel"
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
};

export default ToggleModal;
