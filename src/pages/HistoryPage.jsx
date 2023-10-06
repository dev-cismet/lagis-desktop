import Graph from "../components/commons/Graph";
import HistoryInfo from "../components/history/HistoryInfo";
import View from "../components/history/View";
import OptionHistory from "../components/history/OptionHistory";
import { useSelector } from "react-redux";
import { getHistory, getLandparcel } from "../store/slices/lagis";
import { generateGraphString } from "../core/tools/history";
import { useState, useRef, useEffect } from "react";
const HistoryPage = ({ width = "100%", height = "1000", inStory = false }) => {
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef(null);
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid ",
      background: "gray",
      padding: "4px",
    };
  }

  const firstRow = {
    height: window.innerHeight - 188 - 52 - 16 - 16 - 16 - 16 - 54,
  };
  // const gutterStyle = [16, 16];
  // const marginBottomStyle = { marginBottom: "16px" };
  const history = useSelector(getHistory);
  const fstck = useSelector(getLandparcel);

  let fstckString;
  if (fstck) {
    fstckString = `${fstck.flurstueck_schluessel.gemarkung.bezeichnung} ${fstck.flurstueck_schluessel.flur} ${fstck.flurstueck_schluessel.flurstueck_zaehler}/${fstck.flurstueck_schluessel.flurstueck_nenner}`;
  }
  useEffect(() => {
    const measureHeight = () => {
      if (divRef.current) {
        const height = divRef.current.clientHeight;
        setDivHeight(height);
      }
    };
    measureHeight();
    window.addEventListener("resize", measureHeight);
    return () => {
      window.removeEventListener("resize", measureHeight);
    };
  }, []);
  return (
    <div
      style={{
        ...storyStyle,
      }}
      className="h-full overflow-clip max-h[calc(100%-30px)]"
    >
      <div className="h-[70%] mb-4" ref={divRef}>
        <Graph
          width={"100%"}
          height={divHeight}
          dataIn={history}
          extractor={(histObj) => {
            if (histObj && fstckString) {
              return generateGraphString(histObj, fstckString);
            } else {
              return undefined;
            }
          }}
        />
      </div>

      <div className="flex gap-4 h-[calc(30%-2rem)] mb-4">
        <HistoryInfo />
        <View />
        <OptionHistory />
      </div>
    </div>
  );
};

export default HistoryPage;
