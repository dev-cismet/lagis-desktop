export const generateGraphObj = (
  histObj,
  rootText,
  firstDarstellung,
  secondDarstellung,
  begrenzteTiefe,
  historieHaltenRootText,
  historyHalten,
  historyHaltenArr
) => {
  if (histObj === undefined) {
    return { initialNodesData: [], initialEdgesData: [] };
  }
  const position = { x: 0, y: 0 };
  const edgeType = "smoothstep";
  const historyData = historyHalten ? historyHaltenArr : histObj;

  const addedNodes = new Set();

  const initialNodesData = [];
  const initialEdgesData = [];
  const initialObject = rootText;

  historyData.forEach((item, idx) => {
    const { nachfolger_name, vorgaenger_name, level } = item;
    if (level < 1 && secondDarstellung === "Nachfolger") {
      if (historyData.length - 1 === idx && initialNodesData.length === 0) {
        initialNodesData.push({
          id: vorgaenger_name.replace(/\s/g, ""),
          type: "input",
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
        type: "input",
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
        nodeStyle.width = 70;
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

  if (initialNodesData.length === 0) {
    initialNodesData.push({
      id: initialObject.replace(/\s/g, ""),
      type: "input",
      data: {
        label: initialObject,
        root: true,
      },
      position,
      style: {},
    });
  }

  const addStyleToRootNode = initialNodesData.find((n) =>
    historyHalten ? n.data?.label === historieHaltenRootText : n.data?.root
  );

  if (addStyleToRootNode) {
    addStyleToRootNode.style = { background: "#E1F1FF" };
  } else {
    console.log("addStyleToRootNode", addStyleToRootNode);
  }

  return { initialNodesData, initialEdgesData };
};
