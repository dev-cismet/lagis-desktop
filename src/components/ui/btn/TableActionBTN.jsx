import { Button } from "antd";
import { PlusOutlined, MinusOutlined, EditOutlined } from "@ant-design/icons";
const TableActionBTN = ({ deleteActiveRow, addOrOpen, editActive }) => {
  return (
    <div className="ml-2 flex gap-1">
      <Button
        size="small"
        className="flex justify-center items-center"
        icon={<PlusOutlined style={{ fontSize: "10px" }} onClick={addOrOpen} />}
      />
      <Button
        size="small"
        className="flex justify-center items-center"
        icon={
          <MinusOutlined
            style={{ fontSize: "10px" }}
            onClick={deleteActiveRow}
          />
        }
      />
      <Button
        size="small"
        className="flex justify-center items-center"
        icon={
          <EditOutlined
            style={{ fontSize: "10px" }}
            onClick={deleteActiveRow}
          />
        }
      />
    </div>
  );
};

export default TableActionBTN;
