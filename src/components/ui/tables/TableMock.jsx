import { Table, Divider } from 'antd';
import { COLOR_AQUA, COLOR_LILA } from '../generalConstant';
const columns = [
    {
      title: 'Agency name',
      dataIndex: 'agency',
      render: (title, record, rowIndex) => (
        <div 
        className="flex justify-between items-center"
        >
        <span 
          style={{
            width: "6px", 
            height: "8px",
            marginRight: "6px",
            backgroundColor: rowIndex % 2 === 1 ? COLOR_AQUA : COLOR_LILA,
          }}>
        </span>
        <span>
          {title}
        </span>
      </div>
      ),
    },
    {
      title: 'Area in m²',
      dataIndex: 'area',
    },
  ];
  
  const data = [
    {
      key: '1',
      agency: '12345678910',
      area: 12345678910,
    },
    {
      key: '2',
      agency: '12345678910',
      area: 12345678910,
    },
    {
      key: '3',
      agency: '12345678910',
      area: 12345678910,
    },
    {
      key: '4',
      agency: '12345678910',
      area: 12345678910,
    },
  ];
const TableMock = () => {
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </>
    )
}

export default TableMock;