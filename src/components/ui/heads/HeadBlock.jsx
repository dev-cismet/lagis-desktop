import {MenuOutlined} from "@ant-design/icons"
const HeadBlock = ({title, children}) => {
    return (
        <div 
            className="flex justify-between items-center py-4"
            style={{borderBottom: "1px solid #C4C4C4"}}
        >
            <MenuOutlined />
            <h3 className="mb-0">{title}</h3>
            <div>{children}</div>
        </div>
    )
}

export default HeadBlock;