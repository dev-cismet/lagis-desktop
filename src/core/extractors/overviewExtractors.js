export function rentExtractor(dataIn) {
  const landparcel = dataIn[0];
  const numberOfRents = landparcel?.ar_vertraegeArray?.length || 0;
  return {
    numberOfRents,
    color: numberOfRents > 0 ? "#5D5FEF" : "#999999",
  };
}
