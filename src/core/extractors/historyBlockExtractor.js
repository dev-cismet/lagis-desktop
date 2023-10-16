import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

export function informationenBlockExtractor(dataIn) {
  if (dataIn === undefined) {
    return {};
  } else {
    const informationenData = dataIn?.flurstueck_schluessel || undefined;
    const informationenObject = {};

    if (informationenData.gueltig_bis === null) {
      informationenObject.historicalSince = "Keine Angabe";
    } else {
      const historicalSinceDate = dayjs(informationenData.gueltig_bis).toDate();
      informationenObject.historicalSince =
        dayjs(historicalSinceDate).format("DD.MM.YYYY");
    }

    if (informationenData.datum_entstehung === null) {
      informationenObject.entstehung = "Keine Angabe";
    } else {
      const entstehungDate = dayjs(informationenData.datum_entstehung).toDate();
      informationenObject.entstehung =
        dayjs(entstehungDate).format("DD.MM.YYYY");
    }

    if (informationenData.datum_letzter_stadtbesitz === null) {
      informationenObject.letzterStadtbesitz = "Keine Angabe";
    } else {
      const letzterStadtbesitzDate = dayjs(
        informationenData.datum_letzter_stadtbesitz
      ).toDate();
      const formattedLetzterStadtbesitz = dayjs(letzterStadtbesitzDate).format(
        "DD.MM.YYYY"
      );

      informationenObject.letzterStadtbesitz =
        formattedLetzterStadtbesitz === informationenObject.historicalSince
          ? "Keine Angabe"
          : formattedLetzterStadtbesitz;
    }

    console.log("informationenBlockExtractor", informationenObject);

    return {
      origin: { title: "Entstehung", data: informationenObject.entstehung },
      historicalSince: {
        title: "Historisch seit",
        data: informationenObject.historicalSince,
      },
      lastOwnership: {
        title: "Letzter Stadtbesitz",
        data: informationenObject.letzterStadtbesitz,
      },
    };
  }
}
