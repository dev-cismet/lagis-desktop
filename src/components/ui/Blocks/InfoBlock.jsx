import HeadBlock from "../heads/HeadBlock";

const InfoBlock = ({ title, children, controlBar, titleAction }) => {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: "6px" }}>
      <HeadBlock title={title} titleAction={titleAction}>
        {controlBar}
      </HeadBlock>
      {children}
    </div>
  );
};

export default InfoBlock;
