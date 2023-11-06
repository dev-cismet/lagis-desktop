// import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
// import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent.js";
import "react-cismap/topicMaps.css";
import "leaflet/dist/leaflet.css";
import React, { useCallback, useState, useEffect } from "react";
import { Card } from "antd";
import { useSearchParams } from "react-router-dom";
import "./graph.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { initialNodesData, initialEdgesData } from "../../core/tools/history";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

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
console.log("graph node", initialNodesData, initialEdgesData);

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;
const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodesData,
  initialEdgesData
);

const Graph = ({
  dataIn,
  extractor = mockExtractor,
  rootObjectText,
  width = 1000,
  height = 500,
  fit = true,
  zoom = true,
}) => {
  console.log("History \n\n" + JSON.stringify(dataIn, null, 2));
  const data = extractor(dataIn);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const handleNodeClick = (event, node) => {
    console.log(`Clicked node with ID: ${node.id}`);
    setSelectedNode(node.id);
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const selectedNodeStyle = {
    background: "#E1F1FF",
    height: 36,
  };

  const rootNodeStyleAfterClick = {
    background: "#f5f7f7",
  };

  const getNodeStyle = (node) => {
    if (node.id === selectedNode) {
      return selectedNodeStyle;
    } else {
      return node.data.root && selectedNode !== null
        ? rootNodeStyleAfterClick
        : node.style;
    }
  };

  const padding = 5;
  const headHeight = 37;
  const [urlParams, setUrlParams] = useSearchParams();
  const handleUrlParams = (landParcelString) => {
    const lansParcelParamsArray = landParcelString.split(" ");
    const lansParcelParamsObj = {};
    lansParcelParamsObj.gem = lansParcelParamsArray[0];
    lansParcelParamsObj.flur = lansParcelParamsArray[1];
    lansParcelParamsObj.fstck = lansParcelParamsArray[2].replace(/\//g, "-");
    setUrlParams(lansParcelParamsObj);
  };
  useEffect(() => {}, [data]);
  return (
    <Card
      size="small"
      hoverable={false}
      title={
        <span>
          <FontAwesomeIcon icon={faBars} /> Graph {rootObjectText}
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
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style: getNodeStyle(node),
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        {/* <Panel position="top-right">
          <button onClick={() => onLayout("TB")}>vertical layout</button>
          <button onClick={() => onLayout("LR")}>horizontal layout</button>
        </Panel> */}
      </ReactFlow>
      );
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
