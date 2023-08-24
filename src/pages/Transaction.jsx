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
      className="flex flex-col h-full gap-4"
    >
      <div className="flex-1">
        <Map width={"100%"} height={"100%"} />
      </div>
      <div className="flex-1">
        <TransactionNumber />
      </div>
    </div>
  );
};

export default Transaction;
