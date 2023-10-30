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

// Example usage:
// const data = [/* your data array here */];
// const fallback = "Fallback Node";
// console.log(generateGraphString(data, fallback));
