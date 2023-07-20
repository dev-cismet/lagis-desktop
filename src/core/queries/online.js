const queries = {};
export const geomFactories = {};
export default queries;

queries.first = `query q($gemarkung: String, $flur: Int, $fstkZaehler: Int, $fstkNenner: Int){
    flurstueck(where: {flurstueck_schluessel: {_and: {gemarkung: {bezeichnung: {_eq: $gemarkung}},
                                                      flur: {_eq: $flur}, 
                                                      flurstueck_zaehler: {_eq: $fstkZaehler}, 
                                                      flurstueck_nenner: {_eq: $fstkNenner}
                                    }}}) {
      id
      flurstueck_schluessel {
        flurstueck_zaehler
        flurstueck_nenner
        flur
        flurstueck_art {
          bezeichnung
        }
        bemerkung_sperre
        datum_entstehung
        datum_letzter_stadtbesitz
        gemarkung {
          bezeichnung
          schluessel
        }
        ist_gesperrt
        letzte_bearbeitung
        letzter_bearbeiter
        war_staedtisch
      }
      ar_vertraegeArray {
        vertrag {
          aktenzeichen
          bemerkung
          beschlussArrayRelationShip {
            beschlussart {
              bezeichnung
            }
            datum
            vertrag {
              gesamtpreis
              bemerkung
              aktenzeichen
              datum_auflassung
              datum_eintragung
              quadratmeterpreis
              vertragspartner
              vertragsart {
                bezeichnung
              }
            }
          }
        }
      }
    }
}
`;

queries.keys = `query Keys {
    gemarkung {
      id
      schluessel
      bezeichnung
    }
    kategorie {
      abkuerzung
      bezeichnung
      id
    }
   
    nutzungsart {
      bezeichnung
      id
      schluessel
    }
    oberkategorie {
      abkuerzung
      bezeichnung
      id
    }
    rebe_art {
      bezeichnung
      id
    }
    vertragsart {
      bezeichnung
      id
    }
  }
  `;

export const exampleQueryParameter = {
  gemarkung: "Barmen",
  flur: 1,
  fstkZaehler: 367,
  fstkNenner: 0,
};
