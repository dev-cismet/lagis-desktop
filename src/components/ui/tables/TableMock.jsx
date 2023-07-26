import { Table } from "antd";
import "./table-style.css";

const TableMock = ({ columns, data, pagination = false }) => {
  let paginationConfig = !pagination
    ? pagination
    : {
        pageSize: 4,
      };
  return (
    <div className="table-wrapper">
      <Table
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
        bordered={true}
        className="table-cover"
        // scroll={{ y: "auto" }}
      />
    </div>
  );
};

export default TableMock;
