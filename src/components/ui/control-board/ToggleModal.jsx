const ToggleModal = ({ children }) => {
  const btnStyle = {
    width: "15px",
    height: "15px",
    backgroundColor: "#DDE2E8",
    borderRadius: "2px",
    lineHeight: "15px",
    textAlign: "center",
  };
  return (
    <div className="flex gap-1 itemes center">
      {children}
      <span style={btnStyle}>+</span>
      <span style={{ ...btnStyle, lineHeight: "12px" }}>-</span>
    </div>
  );
};

export default ToggleModal;
