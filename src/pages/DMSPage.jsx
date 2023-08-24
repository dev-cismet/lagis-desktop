import { Col, Row } from "antd";
import DmsBlock from "../components/dms/DmsBlock";
const DMSPage = ({ width = "100%", height = "100%", inStory = false }) => {
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
      className="flex h-full"
    >
      <div className="flex-1">
        <DmsBlock />
      </div>
    </div>
  );
};

export default DMSPage;
