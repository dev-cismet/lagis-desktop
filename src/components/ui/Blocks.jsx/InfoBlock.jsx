import ToggleModal from "../control-board/ToggleModal";
import HeadBlock from "../heads/HeadBlock";
import TableMock from "../tables/TableMock";

const InfoBlock = () => {
    return (
        <div>
            <HeadBlock title="Dienststellen">
                <ToggleModal />
            </HeadBlock>
            <TableMock />
        </div>
    )
}

export default InfoBlock;