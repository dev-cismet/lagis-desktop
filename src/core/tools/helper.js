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

export const compare = (a, b) => {
  if (a === undefined || a === null) {
    a = "";
  }
  if (b === undefined || a === null) {
    b = "";
  }

  return (
    isFinite(b) - isFinite(a) ||
    a - b ||
    (a?.length === b?.length && a.toString().localeCompare(b)) ||
    a?.length - b?.length
  );
};

export function formatPrice(number) {
  if (!number) {
    return number;
  }
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedNumber = formatter.format(number);

  return formattedNumber;
}

export const defaultLinksColor = "#E0E0E0";

export const removeLeadingZeros = (numberStr, flur = false) => {
  if (!numberStr) {
    return undefined;
  }
  const parts = numberStr.split("/");

  const trimmedParts = parts.map((part) => {
    let startIndex = 0;

    while (startIndex < part.length && part[startIndex] === "0") {
      startIndex++;
    }

    return part.substring(startIndex);
  });

  const flurResalt = trimmedParts.join("/");

  const result =
    trimmedParts.length > 1
      ? trimmedParts.join("/")
      : trimmedParts.join("") + "/0";

  return !flur ? result : flurResalt;
};
