import React, { useState } from "react";
import { Modal } from "antd";
import "./toggle.css";
import TableActionBTN from "../btn/TableActionBTN";
const ToggleModal = ({
  children,
  section,
  name,
  content,
  // showModalButton = true,
  modalWidth = 520,
  isActiveRow,
  addRow,
  deleteActiveRow,
}) => {
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
  const addOrOpen = () => {
    if (isActiveRow) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
      addRow();
    }
  };
  const childrenWithProps = React.Children.map(children, (child) => {
    console.log("children", child);
    return React.isValidElement(child)
      ? React.cloneElement(child, { setModalOpen })
      : child;
  });

  return (
    <div className="flex gap-1 items-center">
      {content}
      <TableActionBTN addOrOpen={addOrOpen} deleteActiveRow={deleteActiveRow} />
      <Modal
        width={modalWidth}
        title={
          <div className="flex items-center flex-wrap mt-4 mb-8">
            <div
              className="flex items-center flex-wrap p-3 rounded-lg w-auto"
              style={{ backgroundColor: "#fdfdfd" }}
            >
              <span className="font-semibold">LogIS</span>
              <span
                className="mx-2"
                style={{ fontSize: "6px", lineHeight: "30px" }}
              >
                ⬤
              </span>
              <span className="font-semibold mr-1">{section}</span>
              {name && <span className="font-semibold">— {name}</span>}
            </div>
            <span
              style={{
                flexGrow: "1",
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
        {childrenWithProps}
      </Modal>
    </div>
  );
};

export default ToggleModal;
