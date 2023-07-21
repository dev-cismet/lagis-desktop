import {MenuOutlined} from "@ant-design/icons"
const HeadBlock = ({title, children}) => {
    return (
        <div className="flex justify-between items-center my-1">
            <MenuOutlined />
            <h3 className="mb-0">{title}</h3>
            <div>{children}</div>
        </div>
    )
}

export default HeadBlock;