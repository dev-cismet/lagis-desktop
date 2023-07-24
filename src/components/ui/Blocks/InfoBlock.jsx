import HeadBlock from "../heads/HeadBlock";

const InfoBlock = ({ title, children, controlBar }) => {
  return (
    <div className="shadow-2xl">
      <HeadBlock title={title}>{controlBar}</HeadBlock>
      {children}
    </div>
  );
};

export default InfoBlock;
