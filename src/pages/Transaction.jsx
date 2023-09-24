import Map from "../components/commons/Map";
import TransactionNumber from "../components/transaction/TransactionNumber";
import { transactionPageExtractor } from "../core/extractors/transactionPageExtractor";
import { getAlkisLandparcel, getLandparcel } from "../store/slices/lagis";
import { useSelector } from "react-redux";

const Transaction = ({ width = "100%", height = "100%", inStory = false }) => {
  const alkisLandparcel = useSelector(getAlkisLandparcel);
  const landparcel = useSelector(getLandparcel);
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
          dataIn={alkisLandparcel}
          extractor={(dataIn) => {
            if (dataIn) {
              const alkisLandparcel = dataIn;
              const feature = {
                type: "Feature",
                featureType: "landparcel",
                id: "landparcel." + alkisLandparcel.alkis_id,
                geometry: alkisLandparcel.geometrie,
                crs: alkisLandparcel.geometrie.crs,
                properties: {
                  id: alkisLandparcel.alkis_id,
                },
              };

              return {
                homeCenter: [51.272570027476256, 7.19963690266013],
                homeZoom: 16,
                featureCollection: [feature],
                styler: (feature) => {
                  const style = {
                    color: "#005F6B",
                    weight: 1,
                    opacity: 0.6,
                    fillColor: "#26ADE4",
                    fillOpacity: 0.6,
                    className: "landparcek-" + feature.properties.id,
                  };
                  return style;
                },
              };
            } else {
              return {
                homeCenter: [51.272570027476256, 7.19963690266013],
                homeZoom: 13,
                featureCollection: [],
              };
            }
          }}
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
