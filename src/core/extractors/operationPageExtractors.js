import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
export function contractsBlockExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const contracts = landparcel.ar_vertraegeArray;
    if (contracts.length > 0) {
      const data = contracts.map((c) => ({
        id: nanoid(),
        vertragsart: c.vertrag.vertragsart.bezeichnung,
        nummer: c.vertrag.aktenzeichen,
        quadratmeterpreis: c.vertrag.quadratmeterpreis,
        kaufpreis: c.vertrag.gesamtpreis,
      }));
      return data;
    }
    return [];
  }
}

export function contractDataBlockExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const contract = landparcel.ar_vertraegeArray;
    if (contract.length > 0) {
      const data = contract.map((c) => {
        let formattedAuflassung = null;
        let formattedEintragung = null;

        if (c.vertrag.datum_auflassung) {
          const dateAuflassung = dayjs(c.vertrag.datum_auflassung).toDate();
          formattedAuflassung = dayjs(dateAuflassung).format("DD.MM.YYYY");
        } else {
          formattedAuflassung = "";
        }

        if (c.vertrag.datum_eintragung) {
          const dateEintragung = dayjs(c.vertrag.datum_eintragung).toDate();
          formattedEintragung = dayjs(dateEintragung).format("DD.MM.YYYY");
        } else {
          formattedEintragung = "";
        }

        return {
          id: nanoid(),
          voreigentümer: c.vertrag.vertragspartner,
          auflassung: formattedAuflassung,
          eintragung: formattedEintragung,
          bemerkung: c.vertrag.bemerkung ? c.vertrag.bemerkung : "",
        };
      });
      return data;
    }
    return [];
  }
}

export function crossReferencesExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const contract = landparcel.ar_vertraegeArray;
    const kosten = [];
    if (contract.length > 0) {
      contract.forEach((c) => {
        const fields = {};
        c.vertrag.kostenArrayRelationShip.forEach((k) => {
          let formattedAnweisung = null;
          if (k.datum) {
            const dateAnweisung = dayjs(k.datum.toDate());
            formattedAnweisung = dayjs(dateAnweisung).format("DD.MM.YYYY");
          } else {
            formattedAnweisung = "";
          }
          fields.kostenart = k.kostenart.bezeichnung;
          fields.betrag = k.betrag;
          fields.anweisung = formattedAnweisung;
        });
        kosten.push(fields);
      });
      console.log("cross extractor", kosten);

      return kosten;
    }
    return [];
  }
}

// return {
//   id: nanoid(),
//   kostenart: bezeichnung,
//   betrag: "03.05.2023",
//   anweisung: "03.06.2023",
// };
