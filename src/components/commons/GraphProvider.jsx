import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import Graph from "./Graph";

function GraphProvider(props) {
  return (
    <ReactFlowProvider>
      <Graph {...props} />
    </ReactFlowProvider>
  );
}

export default GraphProvider;
