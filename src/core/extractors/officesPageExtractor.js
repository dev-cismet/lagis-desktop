export function noteExtractor(dataIn) {
  if (dataIn === undefined) {
    return {
      currentText: "",
    };
  } else {
    const lagisLandparcel = dataIn;
    const currentText = lagisLandparcel?.bemerkung || "";
    return {
      currentText,
    };
  }
}
