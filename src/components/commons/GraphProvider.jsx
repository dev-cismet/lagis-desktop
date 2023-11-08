import ReactFlow, { ReactFlowProvider, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import Graph from "./Graph";
import { Spin } from "antd";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function GraphProvider(props) {
  const nodesdata = props.nodesData;
  return (
    <div>
      {nodesdata === null ? (
        <Card
          title={
            <span>
              <FontAwesomeIcon icon={faBars} />
            </span>
          }
          className="shadow-md"
          style={{
            width: props.width,
            height: props.height,
          }}
          bodyStyle={{ height: props.height - 100 }}
        >
          <div className="flex items-center justify-center h-full">
            <Spin />
          </div>
        </Card>
      ) : (
        <ReactFlowProvider>
          <Graph {...props} />
        </ReactFlowProvider>
      )}
    </div>
  );
}

export default GraphProvider;
