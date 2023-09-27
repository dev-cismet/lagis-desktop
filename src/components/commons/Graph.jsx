import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent.js";
import "react-cismap/topicMaps.css";
import "leaflet/dist/leaflet.css";
import { Card } from "antd";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Graphviz } from "graphviz-react";

const mockExtractor = (input) => {
  return {
    dot: `digraph _Graph_ {
      "Barmen 205 688/0"->"pseudo Schluessel18746" [lineInterpolate="linear"];
      "pseudo Schluessel18746"->"Barmen 200 316/0" [lineInterpolate="linear"];
      "pseudo Schluessel18746"->"Barmen 201 250/0" [lineInterpolate="linear"];
      "pseudo Schluessel18746"->"Barmen 201 251/0" [lineInterpolate="linear"];
      "pseudo Schluessel18746"->"Barmen 201 252/0" [lineInterpolate="linear"];
      "pseudo Schluessel18746"->"Barmen 206 132/0" [lineInterpolate="linear"];
      "Barmen 200 316/0"->"pseudo Schluessel22309" [lineInterpolate="linear"];
      "Barmen 201 250/0"->"Barmen 201 253/0" [lineInterpolate="linear"];
      "Barmen 201 250/0"->"Barmen 201 254/0" [lineInterpolate="linear"];
      "Barmen 201 252/0"->"pseudo Schluessel22309" [lineInterpolate="linear"];
      "Barmen 206 132/0"->"Barmen 206 133/0" [lineInterpolate="linear"];
      "Barmen 206 132/0"->"Barmen 206 134/0" [lineInterpolate="linear"];
      "Barmen 206 132/0"->"Barmen 206 135/0" [lineInterpolate="linear"];
      "pseudo Schluessel22309"->"Barmen 201 256/0" [lineInterpolate="linear"];
      "Barmen 201 253/0"->"pseudo Schluessel22309" [lineInterpolate="linear"];
      "Barmen 201 254/0"->"pseudo Schluessel22309" [lineInterpolate="linear"];
      "Barmen 206 134/0"->"Barmen 201 255/0" [lineInterpolate="linear"];
      "Barmen 206 135/0"->"Barmen 205 709/0" [lineInterpolate="linear"];
      "pseudo Schluessel22309"->"Barmen 200 326/0" [lineInterpolate="linear"];
      "pseudo Schluessel22309"->"Barmen 201 257/0" [lineInterpolate="linear"];
      "pseudo Schluessel22309"->"Barmen 201 258/0" [lineInterpolate="linear"];
      "Barmen 205 688/0"  [style="fill: #eee; font-weight: bold"];
      "pseudo Schluessel18746" [label="    "]"pseudo Schluessel22309" [label="    "]}`,
  };
};

const Graph = ({
  dataIn,
  extractor = mockExtractor,
  width = 1000,
  height = 500,
  fit = true,
  zoom = true,
}) => {
  console.log("History \n\n" + JSON.stringify(dataIn, null, 2));
  const data = extractor(dataIn);
  const padding = 5;
  const headHeight = 37;

  return (
    <Card
      size="small"
      hoverable={false}
      title={
        <span>
          <FontAwesomeIcon icon={faBars} /> Graph
        </span>
      }
      className="shadow-md"
      style={{
        width: width,
        height: height,
      }}
      bodyStyle={{ padding }}
      headStyle={{ backgroundColor: "white" }}
      type="inner"
    >
      <Graphviz
        key={"graphviz" + data}
        options={{
          fit,
          zoom,
          width: width - 2 * padding,
          height: height - 2 * padding - headHeight,
        }}
        dot={data || "digraph _Graph_ {}"}
      />
    </Card>
  );
};
export default Graph;

Graph.propTypes = {
  /**
   * The width of the map
   */
  width: PropTypes.number,

  /**
   * The height of the map
   */
  height: PropTypes.number,

  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,

  /**
   * The style of the map
   */
  mapStyle: PropTypes.object,

  /**
   * Should the Graph be fitted to the container
   * @type {[type]}
   * @default true
   * @description If true, the map will be fitted to the container
   */
  fit: PropTypes.bool,

  /**
   * Should the Graph be zoomable
   * @default true
   * @type {[type]}
   * @description If true, the map will be zoomable
   */
  zoom: PropTypes.bool,
};
