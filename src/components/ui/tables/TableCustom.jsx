import { useState, useEffect } from "react";
import { Table } from "antd";
import "./table-style.css";

const TableCustom = ({
  columns,
  data,
  pagination = false,
  addClass = "table-wrapper",
  setActiveRow,
  activeRow,
}) => {
  const [selectedRow, setSelectedRow] = useState(activeRow);
  const handleRowClick = (record) => {
    setActiveRow(record);
    setSelectedRow(record.key);
  };

  let paginationConfig = !pagination
    ? pagination
    : {
        // pageSize: 4,
      };
  return (
    <div className={addClass} style={{ padding: "0 0 8px" }}>
      <Table
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          className:
            record.key === activeRow.key ? "ant-table-row-selected" : "",
        })}
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
        bordered={true}
        scroll={{ x: "auto" }}
      />
    </div>
  );
};

export default TableCustom;
