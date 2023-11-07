import ReactFlow, { ReactFlowProvider, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import Graph from "./Graph";
import { Spin } from "antd";
function GraphProvider(props) {
  const nodesdata = props.nodesData;
  return (
    <div>
      {nodesdata === null ? (
        <div className="flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <ReactFlowProvider>
          <Graph {...props} />
        </ReactFlowProvider>
      )}
    </div>
  );
}

export default GraphProvider;
