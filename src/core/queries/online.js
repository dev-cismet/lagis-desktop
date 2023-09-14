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

queries.gemarkung = `query MyQuery{
  gemarkung{
    schluessel
    bezeichnung
  }
}
`;

queries.flur = `query q($gemarkung)`;

queries.zaehler = `query q($gemarkung_id: Int) {
  flurstueck_schluessel(distinct_on: flurstueck_zaehler, where: {fk_gemarkung: {_eq: $gemarkung_id}}) {
    flurstueck_zaehler
  }
}`;

queries.nenner = `query q($gemarkung_id: Int, $zaehler: Int) {
  flurstueck_schluessel(distinct_on: flurstueck_nenner, where: {_and: {flurstueck_zaehler: {_eq: $zaehler}, fk_gemarkung: {_eq: $gemarkung_id}}}) {
    flurstueck_nenner
  }
}
`;

queries.flurstuecke = `query MyQuery {
  alkis_flurstueck {
    alkis_id
    fk_schluessel
    flurstueck_schluessel {
      fk_flurstueck_art
    }
  }
  gemarkung {
    bezeichnung
    schluessel
  }
}`;

queries.getLagisLandparcelByFlurstueckSchluesselId = `query MyQuery($schluessel_id: Int, $alkis_id: String) {
  alkis_flurstueck(where: {alkis_id: {_eq: $alkis_id}}) {
    alkis_id
    geometrie
  }
  flurstueck(where: {flurstueck_schluessel: {_and: {id: {_eq: $schluessel_id}}}}) {
    id
    flurstueck_schluessel {
      gemarkung {
        bezeichnung
      }
      flur
      flurstueck_zaehler
      flurstueck_nenner
    }
    ar_baeumeArray {
      baum {
        alte_nutzung
        ar_baum_merkmale
        ar_baum_merkmaleArray {
          baum_merkmal {
            bezeichnung
            id
          }
        }
        auftragnehmer
        baum_nutzung {
          baum_kategorie {
            bezeichnung
            id
            ar_kategorie_auspraegungenArray {
              baum_kategorie_auspraegung {
                bezeichnung
                id
              }
            }
          }
          baum_kategorie_auspraegung {
            id
            bezeichnung
          }
          id
        }
        baumnummer
        bemerkung
        erfassungsdatum
        faelldatum
        flaeche
        lage
        id
        geom {
          geo_field
        }
      }
    }
    ar_vertraegeArray {
      vertrag {
        id
        vertragspartner
        quadratmeterpreis
        vertragsart {
          bezeichnung
          id
        }
        gesamtpreis
        datum_eintragung
        datum_auflassung
        bemerkung
        aktenzeichen
        beschlussArrayRelationShip {
          datum
          beschlussart {
            bezeichnung
            id
          }
          fk_vertrag
        }
        kostenArrayRelationShip {
          kostenart {
            bezeichnung
            id
            ist_nebenkostenart
          }
          datum
          betrag
          fk_vertrag
        }
      }
    }
    bemerkung
    in_stadtbesitz
    kassenzeichenArrayRelationShip {
      id
      kassenzeichennummer
      zugeordnet_am
      zugeordnet_von
    }
    nutzungArrayRelationShip {
      nutzung_buchungArrayRelationShip {
        quadratmeterpreis
        ist_buchwert
        gueltig_von
        gueltig_bis
        flaeche
        bemerkung
        nutzungsart {
          bezeichnung
          id
          schluessel
        }
        anlageklasse {
          bezeichnung
          id
          schluessel
        }
        ar_bebauungenArray {
          bebauung {
            bezeichnung
            id
          }
        }
        ar_flaechennutzungenArray {
          flaechennutzung {
            bezeichnung
            id
          }
        }
      }
    }
    spielplatz {
      id
      ist_klettergeruest_wartung_erforderlich
      ist_rutsche_wartung_erforderlich
      ist_sandkasten_wartung_erforderlich
      ist_schaukel_wartung_erforderlich
      ist_wippe_wartung_erforderlich
      klettergeruest_vorhanden
      rutsche_vorhanden
      sandkasten_vorhanden
      schaukel_vorhanden
      wippe_vorhanden
    }
    strassenfrontArrayRelationShip {
      strassenname
      laenge
      id
    }
    verwaltungsbereiche_eintragArrayRelationShip {
      id
      geaendert_von
      geaendert_am
      verwaltungsbereichArrayRelationShip {
        geom {
          geo_field
        }
        verwaltende_dienststelle {
          abkuerzung_abteilung
          bezeichnung_abteilung
          email_adresse
          farbeArrayRelationShip {
            rgb_farbwert
            stil {
              bezeichnung
            }
          }
          ressort {
            abkuerzung
            bezeichnung
            id
          }
        }
        verwaltungsgebrauch {
          abkuerzung
          bezeichnung
          unterabschnitt
          kategorie {
            abkuerzung
            bezeichnung
            oberkategorie {
              abkuerzung
              bezeichnung
              id
            }
          }
        }
      }
    }
    zusatz_rolleArrayRelationShip {
      geom {
        geo_field
      }
      verwaltende_dienststelle {
        abkuerzung_abteilung
        bezeichnung_abteilung
        email_adresse
        farbeArrayRelationShip {
          rgb_farbwert
          stil {
            bezeichnung
            id
          }
        }
        ressort {
          abkuerzung
          bezeichnung
          id
        }
      }
      zusatz_rolle_art {
        id
        name
        schluessel
      }
    }
    dms_urlArrayRelationShip {
      name
      typ
      url {
        object_name
        url_base {
          path
          prot_prefix
          server
          id
        }
        id
      }
      beschreibung
      id
    }
  }
}`;

queries.getRebeByGeom = `query MyQuery($geo: geometry) {
  rebe(where: {geom: {geo_field: {_st_intersects: $geo}}}) {
    bemerkung
    beschreibung
    datum_eintragung
    datum_loeschung
    ist_recht
    nummer
    rebe_art {
      bezeichnung
    }
    geom {
      geo_field
    }
  }
}`;
