const ToggleModal = () => {
    const btnStyle = {
        width: "15px", 
        height: "15px", 
        backgroundColor: "#DDE2E8", 
        borderRadius: "2px",
        lineHeight: "15px",
    }
    return (
        <div className="flex gap-1 itemes center">
            <span style={btnStyle}>+</span>
            <span style={{...btnStyle, lineHeight: "12px"}}>-</span>
        </div>
    )
}


export default ToggleModal;