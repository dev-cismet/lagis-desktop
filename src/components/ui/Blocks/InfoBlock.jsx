import ToggleModal from "../control-board/ToggleModal";
import HeadBlock from "../heads/HeadBlock";
import TableMock from "../tables/TableMock";

const InfoBlock = ({ columns, data, title, children }) => {
  return (
    <div>
      <HeadBlock title={title}>
        <ToggleModal>{children}</ToggleModal>
      </HeadBlock>
      <TableMock columns={columns} data={data} />
    </div>
  );
};

export default InfoBlock;
