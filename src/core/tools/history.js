/**
 * Generates a graph string in DOT format based on the input data.
 *
 * @param {Array} data - The input data array containing node relationships.
 * @param {string} fallback - The fallback string to use if the data array is empty or undefined.
 * @returns {string} - The generated graph string in DOT format.
 */
export function generateGraphString(
  data,
  fallback,
  firstDarstellung,
  secondDarstellung,
  begrenzteTiefe,
  historieHaltenRootText,
  historieHalten = false
) {
  // Initialize an empty string to store the graph representation
  let graphString = "digraph _Graph_ {\n";
  let nodeAdded = false;
  // secondDarstellung = "Vorgänger";

  // If data is undefined or empty, add the fallback node and return
  if (!data || data.length === 0) {
    graphString += `    "${fallback}" [style="fill: #eee; font-weight: bold"];\n`;
    graphString += "}";
    return graphString;
  }

  // Create a set to keep track of nodes that have been added
  const addedNodes = new Set();

  // Helper function to add nodes with appropriate styling
  function addNode(name, root = false) {
    if (name.startsWith("pseudo ")) {
      graphString += `    "${name}" [label="    " shape="box"];\n`; // Empty label for "pseudo " nodes
    } else {
      if (name === fallback) {
        graphString += `    "${name}" [style="filled", fillcolor="#E1F1FF" shape="box"];\n`;
      } else {
        graphString += `    "${name}" [style="fill: #eee; font-weight: bold"  shape="box"];\n`;
        if (name === historieHaltenRootText && historieHalten) {
          graphString += `    "${name}" [style="filled", fillcolor="#D9D9D9"  shape="box"];\n`;
        }
      }
    }
    addedNodes.add(name);
    nodeAdded = true;
  }

  // Iterate over each item in the data array
  for (const item of data) {
    // Extract relevant properties from the current item
    const { vorgaenger_name, nachfolger_name, level } = item;
    let itemAdded = false;

    if (level < 1 && secondDarstellung === "Nachfolger") {
      continue;
    }

    if (level > 0 && secondDarstellung === "Vorgänger") {
      continue;
    }

    if (level != 0 && level != 1 && firstDarstellung === "Direkte") {
      continue;
    }

    if (
      (level > begrenzteTiefe || level <= -1 * begrenzteTiefe) &&
      firstDarstellung === "Begrenzte"
    ) {
      continue;
    }

    const rootObject = item?.rootObject || false;

    // Add the predecessor node to the graph if it hasn't been added yet
    if (!addedNodes.has(vorgaenger_name)) {
      addNode(vorgaenger_name, rootObject);
      itemAdded = true;
    }

    // Add the successor node to the graph if it hasn't been added yet
    if (!addedNodes.has(nachfolger_name)) {
      addNode(nachfolger_name, rootObject);
      itemAdded = true;
    }

    // Add the relationship (edge) between the predecessor and successor nodes
    graphString += `    "${vorgaenger_name}"->"${nachfolger_name}" [lineInterpolate="linear"];\n`;
  }

  if (!nodeAdded) {
    graphString += `    "${fallback}" [style="fill: #eee; font-weight: bold"  shape="box"];\n`;
    graphString += "}";
    return graphString;
  }

  // Close the graph representation
  graphString += "}";

  return graphString;
}

export const initialNodesData = [];
export const initialEdgesData = [];

export const generateGraphObj = (
  histObj,
  rootText,
  firstDarstellung,
  secondDarstellung,
  begrenzteTiefe,
  historieHaltenRootText,
  historyHalten
) => {
  const position = { x: 0, y: 0 };
  const edgeType = "smoothstep";

  const historyData = histObj;

  const addedNodes = new Set();

  const initialNodesData = [];
  const initialEdgesData = [];
  const initialObject = rootText;
  // const secondDarstellung = "Vorgänger";
  // const secondDarstellung = "Nachfolger";
  // const secondDarstellung = "All";
  // const firstDarstellung = "Direkte";
  // const firstDarstellung = "Begrenzte";
  // const firstDarstellung = "All";
  // const begrenzteTiefe = 1;

  historyData.forEach((item, idx) => {
    const { nachfolger_name, vorgaenger_name, level } = item;
    if (level < 1 && secondDarstellung === "Nachfolger") {
      if (historyData.length - 1 === idx && initialNodesData.length === 0) {
        initialNodesData.push({
          id: vorgaenger_name.replace(/\s/g, ""),
          data: {
            label: initialObject,
            root: true,
          },
          position,
          style: {},
        });
      }
      return;
    }

    if (level > 0 && secondDarstellung === "Vorgänger") {
      return;
    }

    if (level != 0 && level != 1 && firstDarstellung === "Direkte") {
      return;
    }

    if (
      (level > begrenzteTiefe || level <= -1 * begrenzteTiefe) &&
      firstDarstellung === "Begrenzte"
    ) {
      return;
    }

    const nodeStyle = {};
    if (!addedNodes.has(vorgaenger_name)) {
      if (vorgaenger_name === initialObject) {
        // nodeStyle.background = "#E1F1FF";
      }
      initialNodesData.push({
        id: vorgaenger_name.replace(/\s/g, ""),
        data: {
          label: vorgaenger_name.startsWith("pseudo ")
            ? "   "
            : vorgaenger_name,
          root: vorgaenger_name === initialObject,
        },
        position,
        style: {},
      });

      addedNodes.add(vorgaenger_name);
    }

    if (!addedNodes.has(nachfolger_name)) {
      if (nachfolger_name.startsWith("pseudo ")) {
        nodeStyle.height = 34;
      }
      if (nachfolger_name === initialObject) {
        // nodeStyle.background = "#E1F1FF";
      }
      initialNodesData.push({
        id: nachfolger_name.replace(/\s/g, ""),
        type: "default",
        data: {
          label: nachfolger_name.startsWith("pseudo ")
            ? "   "
            : nachfolger_name,
          root: nachfolger_name === initialObject,
        },
        position,
        style: nodeStyle,
      });

      addedNodes.add(nachfolger_name);
    }

    if (vorgaenger_name !== nachfolger_name) {
      initialEdgesData.push({
        id: idx,
        source: vorgaenger_name.replace(/\s/g, ""),
        target: nachfolger_name.replace(/\s/g, ""),
        type: edgeType,
        animated: false,
      });
    }
  });

  const addStyleToRootNode = initialNodesData.find((n) => n.data?.root);
  // addStyleToRootNode.style = { background: "#E1F1FF" };

  return { initialNodesData, initialEdgesData };
};
