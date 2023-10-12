import { nanoid } from "@reduxjs/toolkit";
import queries from "../queries/online";
import { fetchGraphQL } from "../graphql";
import {
  formatPrice,
  getLandparcelStringFromAlkisLandparcel,
} from "../tools/helper";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const getQuerverweise = async (vertag_id, jwt, landparcel) => {
  const result = await fetchGraphQL(
    queries.getQuerverweiseByVertragId,
    {
      vertag_id,
    },
    jwt
  );
  if (result.data?.flurstueck) {
    const currentLandparcel =
      getLandparcelStringFromAlkisLandparcel(landparcel);
    const landparcelsArr = [];
    const data = result.data?.flurstueck.forEach((f) => {
      const flur = f.flurstueck_schluessel.flur;
      const zaehler = f.flurstueck_schluessel.flurstueck_zaehler;
      const nenner = f.flurstueck_schluessel.flurstueck_nenner;
      const gemarkung = f.flurstueck_schluessel.gemarkung.bezeichnung;
      const crossReference = `${gemarkung} ${flur} ${zaehler}/${nenner}`;
      if (crossReference !== currentLandparcel) {
        landparcelsArr.push(crossReference);
      }
    });

    return landparcelsArr;
  } else {
    [];
  }
};

export const querverweiseContractExtractor = async (dataIn, jwt) => {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const contracts = landparcel.ar_vertraegeArray;
    let vertragId;
    if (contracts.length > 0) {
      contracts.forEach((c) => {
        vertragId = c.vertrag.id;
      });
    } else {
      return [];
    }

    const res = await getQuerverweise(vertragId, jwt, landparcel);
    return res;
  }
};

export function contractsBlockExtractor(dataIn) {
  if (dataIn === undefined) {
    return [];
  } else {
    const landparcel = dataIn;
    const contracts = landparcel.ar_vertraegeArray;
    if (contracts.length > 0) {
      const data = contracts.map((c) => ({
        id: c.id,
        vertragsart: c.vertrag.vertragsart.bezeichnung,
        nummer: c.vertrag.aktenzeichen,
        quadratmeterpreis: formatPrice(c.vertrag.quadratmeterpreis),
        kaufpreis: formatPrice(c.vertrag.gesamtpreis),
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
        c.vertrag.kostenArrayRelationShip.forEach((k) => {
          const fields = {};
          let formattedAnweisung = null;
          if (k.datum) {
            const dateAnweisung = dayjs(k.datum.toDate());
            formattedAnweisung = dayjs(dateAnweisung).format("DD.MM.YYYY");
          } else {
            formattedAnweisung = "";
          }
          fields.kostenart = k.kostenart.bezeichnung;
          fields.betrag = formatPrice(k.betrag);
          fields.anweisung = formattedAnweisung;
          kosten.push(fields);
        });
      });

      return kosten;
    }
    return [];
  }
}
