import { Col, Row } from "antd";
import Map from "../components/commons/Map";
import TransactionNumber from "../components/transaction/TransactionNumber";

const Transaction = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      background: "gray",
      padding: "4px",
    };
  }
  return (
    <div
      style={{
        ...storyStyle,
        backgroundColor: "#F1F1F1",
      }}
      className="h-full"
    >
      <div className="h-1/2 w-full mb-4 bg-[#ffffff]">
        <Map width={"99%"} height={"100%"} />
      </div>
      <div className="h-[calc(50%-2rem)]">
        <TransactionNumber />
      </div>
    </div>
  );
};

export default Transaction;
