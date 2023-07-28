import HeadBlock from "../heads/HeadBlock";

const InfoBlock = ({ title, children, controlBar }) => {
  return (
    <div
      style={
        {
          // height: "100%",
        }
      }
    >
      <HeadBlock title={title}>{controlBar}</HeadBlock>
      {children}
    </div>
  );
};

export default InfoBlock;
