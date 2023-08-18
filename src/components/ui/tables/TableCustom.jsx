import { useState } from "react";
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
  // const resetAciveRow = () => {
  //   setActiveRow(null);
  //   setSelectedRow(null);
  // };
  const handleRowClick = (record) => {
    if (activeRow && record.key === selectedRow) {
      // resetAciveRow();
    } else {
      setSelectedRow(record.key);
      setActiveRow(record);
    }
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
            record.key === selectedRow.key ? "ant-table-row-selected" : "",
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
