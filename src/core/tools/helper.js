export const getNonce = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayString = yyyy + mm + dd;
  const todayInt = parseInt(todayString);
  return todayInt + Math.random();
};

export const getColorFromCode = (code = 12004320) => {
  if (code) {
    let c = code;
    let r = (c & 0xff0000) >> 16;
    let g = (c & 0xff00) >> 8;
    let b = c & 0xff;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return null;
};

export function addLeadingZeros(flur) {
  const correctFlur = "00" + flur;
  return correctFlur;
}

export function buildUrlParams(paramsUrl) {
  if (!paramsUrl?.gem) {
    return "";
  }
  const params = [];
  if (paramsUrl.gem) {
    params.push(`gem=${paramsUrl.gem}`);
  }
  if (paramsUrl.flur) {
    params.push(`&flur=${paramsUrl.flur}`);
  }
  if (paramsUrl.fstck) {
    params.push(`&fstck=${paramsUrl.fstck}`);
  }
  return params.join("");
}
