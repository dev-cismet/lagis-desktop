/**
 * Generates a graph string in DOT format based on the input data.
 *
 * @param {Array} data - The input data array containing node relationships.
 * @param {string} fallback - The fallback string to use if the data array is empty or undefined.
 * @returns {string} - The generated graph string in DOT format.
 */
export function generateGraphString(data, fallback) {
  // Initialize an empty string to store the graph representation
  let graphString = "digraph _Graph_ {\n";

  // If data is undefined or empty, add the fallback node and return
  if (!data || data.length === 0) {
    graphString += `    "${fallback}" [style="fill: #eee; font-weight: bold"];\n`;
    graphString += "}";
    return graphString;
  }

  // Create a set to keep track of nodes that have been added
  const addedNodes = new Set();

  // Helper function to add nodes with appropriate styling
  function addNode(name) {
    if (name.startsWith("pseudo ")) {
      graphString += `    "${name}" [label="    "];\n`; // Empty label for "pseudo " nodes
    } else {
      graphString += `    "${name}" [style="fill: #eee; font-weight: bold"];\n`;
    }
    addedNodes.add(name);
  }

  // Iterate over each item in the data array
  for (const item of data) {
    // Extract relevant properties from the current item
    const { vorgaenger_name, nachfolger_name } = item;

    // Add the predecessor node to the graph if it hasn't been added yet
    if (!addedNodes.has(vorgaenger_name)) {
      addNode(vorgaenger_name);
    }

    // Add the successor node to the graph if it hasn't been added yet
    if (!addedNodes.has(nachfolger_name)) {
      addNode(nachfolger_name);
    }

    // Add the relationship (edge) between the predecessor and successor nodes
    graphString += `    "${vorgaenger_name}"->"${nachfolger_name}" [lineInterpolate="linear"];\n`;
  }

  // Close the graph representation
  graphString += "}";

  return graphString;
}

// Example usage:
// const data = [/* your data array here */];
// const fallback = "Fallback Node";
// console.log(generateGraphString(data, fallback));
