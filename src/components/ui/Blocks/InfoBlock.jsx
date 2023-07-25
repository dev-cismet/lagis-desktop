import HeadBlock from "../heads/HeadBlock";

const InfoBlock = ({ title, children, controlBar }) => {
  return (
    <div
      className="shadow-md"
      style={{
        borderRadius: "7px",
        height: "100%",
        // display: "flex",
        // flexDirection: "column",
      }}
    >
      <HeadBlock title={title}>{controlBar}</HeadBlock>
      {children}
    </div>
  );
};

export default InfoBlock;
