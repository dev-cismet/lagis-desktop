import React, { useState } from "react";
import { Modal, Divider } from "antd";
import OfficesForm from "../forms/ModalForm";
import "./toggle.css";
const ToggleModal = ({ children, section, name, content }) => {
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
        title={
          <div className="flex items-center flex-wrap mt-4 mb-8">
            <div
              className="flex items-center flex-wrap p-3 rounded-lg w-96"
              style={{ backgroundColor: "#fdfdfd", flexGrow: "1" }}
            >
              <span className="font-semibold">LogIS</span>
              <span
                className="mx-2"
                style={{ fontSize: "6px", lineHeight: "30px" }}
              >
                ⬤
              </span>
              <span className="font-semibold mr-1">{section}</span>
              <span className="font-semibold">— {name}</span>
            </div>
            <span
              style={{
                flexBasis: "18%",
                height: "1px",
                backgroundColor: "#1C82E1",
                marginLeft: "16px",
              }}
            ></span>
          </div>
        }
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        okText="submit"
        cancelText="cancel"
        wrapClassName="custom-modal-wrapper"
        footer={null}
      >
        {content}
      </Modal>
    </div>
  );
};

export default ToggleModal;
