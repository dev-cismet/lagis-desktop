import bbox from "@turf/bbox";
import proj4 from "proj4";
import L from "leaflet";
import ColorHash from "color-hash";

export const fitFeatureArray = (featureArray, mapRef) => {
  const bounds = getBoundsForFeatureArray(featureArray);

  //ugly winning to avoid some race condition
  setTimeout(() => {
    mapRef.current.leafletMap.leafletElement.fitBounds(bounds);
  }, 1000);
};

export const getBoundsForFeatureArray = (featureArray) => {
  // Convert your featureArray into a FeatureCollection
  const featureCollection = {
    type: "FeatureCollection",
    features: featureArray,
  };
  return getBoundsForFeatureCollection(featureCollection);
};

export const getBoundsForFeatureCollection = (featureCollection) => {
  // Get bbox in EPSG:3857 from Turf.js
  const boundingBox3857 = bbox(featureCollection);

  // Convert the bounding box from EPSG:3857 to EPSG:4326
  const southWest4326 = proj4("EPSG:25832", "EPSG:4326", [
    boundingBox3857[0],
    boundingBox3857[1],
  ]);
  const northEast4326 = proj4("EPSG:25832", "EPSG:4326", [
    boundingBox3857[2],
    boundingBox3857[3],
  ]);

  // Return Leaflet LatLngBounds
  return L.latLngBounds(
    L.latLng(southWest4326[1], southWest4326[0]), // southwest corner
    L.latLng(northEast4326[1], northEast4326[0]) // northeast corner
  );
};

export function convertBBox2Bounds(bbox, refDef = proj4crs25832def) {
  const projectedNE = proj4(refDef, proj4.defs("EPSG:4326"), [
    bbox[0],
    bbox[1],
  ]);
  const projectedSW = proj4(refDef, proj4.defs("EPSG:4326"), [
    bbox[2],
    bbox[3],
  ]);
  return [
    [projectedNE[1], projectedSW[0]],
    [projectedSW[1], projectedNE[0]],
  ];
}
export const getCenterAndZoomForBounds = (map, bounds) => {
  const center = bounds.getCenter();
  const zoom = map.getBoundsZoom(bounds); // Returns the maximum zoom level on which the given bounds fit to the map view in its entirety. If inside is set to true, it instead returns the minimum zoom level on which the map view fits into the given bounds in its entirety.
  return { center, zoom };
};