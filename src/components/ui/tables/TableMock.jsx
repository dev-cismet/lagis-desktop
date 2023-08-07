import { Table } from "antd";
import "./table-style.css";

const TableMock = ({
  columns,
  data,
  pagination = false,
  addClass = "table-wrapper",
}) => {
  let paginationConfig = !pagination
    ? pagination
    : {
        // pageSize: 4,
      };
  return (
    <div className={addClass} style={{ padding: "0 0 8px" }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
        bordered={true}
        scroll={{ x: "auto" }}
      />
    </div>
  );
};

export default TableMock;
