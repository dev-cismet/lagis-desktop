import ToggleModal from "../control-board/ToggleModal";
import HeadBlock from "../heads/HeadBlock";
import TableMock from "../tables/TableMock";

const InfoBlock = ({ columns, data, title }) => {
  return (
    <div>
      <HeadBlock title={title}>
        <ToggleModal />
      </HeadBlock>
      <TableMock columns={columns} data={data} />
    </div>
  );
};

export default InfoBlock;
