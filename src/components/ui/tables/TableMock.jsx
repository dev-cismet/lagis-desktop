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
        pageSize: 4,
      };
  return (
    <div className={addClass}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
        bordered={true}
        // scroll={{ y: "auto" }}
      />
    </div>
  );
};

export default TableMock;
