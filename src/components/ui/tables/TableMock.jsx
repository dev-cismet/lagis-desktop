import { Table } from "antd";
import "./table-style.css";

const TableMock = ({ columns, data }) => {
  return (
    <div className="table-wrapper">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        className="table-cover"
        // scroll={{ y: "auto" }}
      />
    </div>
  );
};

export default TableMock;
