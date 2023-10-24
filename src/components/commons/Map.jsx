import "react-cismap/topicMaps.css";
import "leaflet/dist/leaflet.css";
import { Card, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FeatureCollectionDisplay,
  MappingConstants,
  RoutedMap,
} from "react-cismap";
import {
  TopicMapStylingContext,
  TopicMapStylingDispatchContext,
} from "react-cismap/contexts/TopicMapStylingContextProvider";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  getBoundsForFeatureArray,
  getCenterAndZoomForBounds,
} from "../../core/tools/mappingTools";
import {
  getShowBackground,
  getShowCurrentFeatureCollection,
  setFeatureCollection,
  setFlaechenSelected,
  setFrontenSelected,
  setGeneralGeometrySelected,
  setLeafletElement,
  setShowBackground,
  setShowCurrentFeatureCollection,
} from "../../store/slices/mapping";
import { useDispatch, useSelector } from "react-redux";
import { ScaleControl } from "react-leaflet";
import { FileImageOutlined, FileImageFilled } from "@ant-design/icons";
import getLayers from "react-cismap/tools/layerFactory";
import { getArea25832 } from "../../core/tools/kassenzeichenMappingTools";

const mockExtractor = (input) => {
  return {
    homeCenter: [51.27225612927373, 7.199918031692506],
    homeZoom: 16,
    featureCollection: [],
  };
};

const Map = ({
  dataIn,
  extractor = mockExtractor,
  width = 400,
  height = 500,
  children,
  boundingBoxChangedHandler = () => {},
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [urlParams, setUrlParams] = useSearchParams();
  // const [fallback, setFallback] = useState({});
  const showCurrentFeatureCollection = useSelector(
    getShowCurrentFeatureCollection
  );
  const showBackground = useSelector(getShowBackground);

  const data = extractor(dataIn);
  const padding = 5;
  const headHeight = 37;
  const cardRef = useRef(null);
  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.5); //uggly winning
  const {
    backgroundModes,
    selectedBackground,
    baseLayerConf,
    backgroundConfigurations,
    additionalLayerConfiguration,
    activeAdditionalLayerKeys,
  } = useContext(TopicMapStylingContext);

  // const {
  //   setSelectedBackground,
  //   setNamedMapStyle,
  //   setActiveAdditionalLayerKeys,
  // } = useContext(TopicMapStylingDispatchContext);

  let backgroundsFromMode;
  const browserlocation = useLocation();
  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }
  const urlSearchParams = new URLSearchParams(browserlocation.search);
  const urlSearchParamsObject = paramsToObject(urlParams);
  try {
    backgroundsFromMode = backgroundConfigurations[selectedBackground].layerkey;
  } catch (e) {}

  const _backgroundLayers = backgroundsFromMode || "rvrGrau@40";

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMapWidth(cardRef?.current?.offsetWidth);
        setMapHeight(cardRef?.current?.offsetHeight);
      }
    });

    resizeObserver.observe(cardRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // const params = paramsToObject(urlParams);
    // if (params.lat && params.lng && params.zoom) {
    //   console.log("xxx won't change map view");
    // } else {
    //   console.log("xxx data changed", data?.featureCollection);
    //   if (data?.featureCollection && refRoutedMap?.current) {
    //     fitFeatureArray(data?.featureCollection, refRoutedMap);
    //   }
    // }
  }, [data?.featureCollection, urlParams]);
  let refRoutedMap = useRef(null);

  const mapStyle = {
    width: mapWidth - 2 * padding,
    height: mapHeight - 2 * padding - headHeight,
    cursor: "pointer",
    clear: "both",
  };

  const defaults = {
    maxWidth: 200,
    metric: true,
    imperial: false,
    updateWhenIdle: false,
    position: "topright",
  };

  let fallback = {};
  if (
    data?.featureCollection &&
    data?.featureCollection.length !== 0 &&
    refRoutedMap?.current
  ) {
    const map = refRoutedMap.current.leafletMap.leafletElement;
    const bb = getBoundsForFeatureArray(data?.featureCollection);
    dispatch(setLeafletElement(map));
    const { center, zoom } = getCenterAndZoomForBounds(map, bb);

    fallback.position = {};
    fallback.position.lat = center.lat;
    fallback.position.lng = center.lng;
    fallback.zoom = zoom;
  }

  // if (data?.featureCollection && refRoutedMap?.current) {
  //   const map = refRoutedMap.current.leafletMap.leafletElement;
  //   dispatch(setLeafletElement(map));

  //   const bb = getBoundsForFeatureArray(data?.featureCollection);
  //   const { center, zoom } = getCenterAndZoomForBounds(map, bb);
  //   if (
  //     fallback?.position?.lat !== center.lat ||
  //     fallback?.position?.lng !== center.lng ||
  //     fallback?.zoom !== zoom
  //   ) {
  //     setFallback({
  //       position: {
  //         lat: center.lat,
  //         lng: center.lng,
  //       },
  //       zoom: zoom,
  //     });
  //   }
  // }

  return (
    <Card
      size="small"
      hoverable={false}
      title={<span>Karte</span>}
      extra={
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <Tooltip title="Hintergrund an/aus">
              <FileImageFilled
                className="h-6 cursor-pointer"
                onClick={() => dispatch(setShowBackground(!showBackground))}
              />
            </Tooltip>
            <div
              className={`w-3 h-3 rounded-full bg-green-500 ${
                showBackground ? "absolute" : "hidden"
              } bottom-0 -right-1`}
            />
          </div>
          <div className="relative flex items-center">
            <Tooltip title="Vordergrund an/aus">
              <FileImageOutlined
                className="h-6 cursor-pointer"
                onClick={() =>
                  dispatch(
                    setShowCurrentFeatureCollection(
                      !showCurrentFeatureCollection
                    )
                  )
                }
              />
            </Tooltip>
            <div
              className={`w-3 h-3 rounded-full bg-green-500 ${
                showCurrentFeatureCollection ? "absolute" : "hidden"
              } bottom-0 -right-1`}
            />
          </div>
        </div>
      }
      style={{
        width: width,
        height: height,
      }}
      bodyStyle={{ padding }}
      headStyle={{ backgroundColor: "white" }}
      type="inner"
      className="overflow-hidden shadow-md"
      ref={cardRef}
    >
      <RoutedMap
        editable={false}
        style={mapStyle}
        key={"leafletRoutedMap"}
        backgroundlayers={showBackground ? _backgroundLayers : null}
        urlSearchParams={urlSearchParams}
        layers=""
        referenceSystem={MappingConstants.crs3857}
        referenceSystemDefinition={MappingConstants.proj4crs3857def}
        ref={refRoutedMap}
        minZoom={9}
        maxZoom={25}
        zoomSnap={0.5}
        zoomDelta={0.5}
        fallbackPosition={{
          lat:
            urlSearchParamsObject?.lat ??
            fallback?.position?.lat ??
            51.272570027476256,
          lng:
            urlSearchParamsObject?.lng ??
            fallback?.position?.lng ??
            7.19963690266013,
        }}
        fallbackZoom={urlSearchParamsObject?.zoom ?? fallback.zoom ?? 10}
        locationChangedHandler={(location) => {
          const newParams = { ...paramsToObject(urlParams), ...location };
          // setUrlParams(newParams);
        }}
        boundingBoxChangedHandler={(boundingBox) => {
          // console.log("xxx boundingBox Changed", boundingBox);
        }}
      >
        {/* {data.featureCollection && data.featureCollection.length > 0 && (
          <FeatureCollectionDisplay
            featureCollection={data.featureCollection}
            style={data.styler}
            markerStyle={data.markerStyle}
            showMarkerCollection={data.showMarkerCollection || false}
            featureClickHandler={
              data.featureClickHandler ||
              ((e) => {
                console.log("no featureClickHandler set", e.target.feature);
              })
            }
          />
        )} */}
        <ScaleControl {...defaults} position="topright" />
        {data.featureCollection &&
          data.featureCollection.length > 0 &&
          showCurrentFeatureCollection && (
            <FeatureCollectionDisplay
              featureCollection={data.featureCollection}
              style={data.styler}
              markerStyle={data.markerStyle}
              showMarkerCollection={data.showMarkerCollection || false}
              featureClickHandler={
                data.featureClickHandler ||
                ((e) => {
                  const feature = e.target.feature;
                  if (feature.selected) {
                    const map = refRoutedMap.current.leafletMap.leafletElement;
                    const bb = getBoundsForFeatureArray([feature]);
                    const { center, zoom } = getCenterAndZoomForBounds(map, bb);
                    setUrlParams((prev) => {
                      prev.set("zoom", zoom);
                      prev.set("lat", center.lat);
                      prev.set("lng", center.lng);
                      return prev;
                    });
                  } else {
                    switch (feature.featureType) {
                      case "flaeche": {
                        dispatch(storeFlaechenId(feature.id));
                        dispatch(setFlaechenSelected({ id: feature.id }));

                        break;
                      }
                      case "front": {
                        dispatch(storeFrontenId(feature.properties.id));
                        dispatch(
                          setFrontenSelected({ id: feature.properties.id })
                        );
                        break;
                      }
                      case "general": {
                        dispatch(
                          setGeneralGeometrySelected({
                            id: feature.properties.id,
                          })
                        );
                        break;
                      }
                      default: {
                        console.log(
                          "no featureClickHandler set",
                          e.target.feature
                        );
                      }
                    }
                  }
                })
              }
            />
          )}
        {/* {children} */}

        {activeAdditionalLayerKeys !== undefined &&
          additionalLayerConfiguration !== undefined &&
          activeAdditionalLayerKeys?.length > 0 &&
          activeAdditionalLayerKeys.map((activekey, index) => {
            const layerConf = additionalLayerConfiguration[activekey];
            if (layerConf?.layer) {
              return layerConf.layer;
            } else if (layerConf?.layerkey) {
              const layers = getLayers(layerConf.layerkey);
              return layers;
            }
          })}
      </RoutedMap>
    </Card>
  );
};
export default Map;

Map.propTypes = {
  /**
   * The width of the map
   */
  width: PropTypes.number,

  /**
   * The height of the map
   */
  height: PropTypes.number,

  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,

  /**
   * The style of the map
   */
  mapStyle: PropTypes.object,
};
