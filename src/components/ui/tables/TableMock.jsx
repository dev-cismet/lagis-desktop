import { Table } from "antd";

const TableMock = ({ columns, data }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
      />
    </>
  );
};

export default TableMock;
