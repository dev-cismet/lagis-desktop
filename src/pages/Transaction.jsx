import Map from "../components/commons/Map";
import TransactionNumber from "../components/transaction/TransactionNumber";
import { mapExtractor } from "../core/extractors/commonExtractors";
import { transactionPageExtractor } from "../core/extractors/transactionPageExtractor";
import {
  getAlkisLandparcel,
  getGeometry,
  getLandparcel,
} from "../store/slices/lagis";
import { useSelector } from "react-redux";

const Transaction = ({ width = "100%", height = "100%", inStory = false }) => {
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  const landparcel = useSelector(getLandparcel);
  const geometry = useSelector(getGeometry);

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
        <Map
          width={"100%"}
          height={height}
          dataIn={{ landparcel, geometry }}
          extractor={mapExtractor}
        />
      </div>
      <div className="h-[calc(50%-2rem)]">
        <TransactionNumber
          dataIn={landparcel}
          extractor={transactionPageExtractor}
        />
      </div>
    </div>
  );
};

export default Transaction;
