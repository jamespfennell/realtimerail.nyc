import React, { useRef, useEffect } from "react";
import {
  Map,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type maplibregl from "maplibre-gl";
import { Stop } from "../api/types";
import StopMarkers from "./StopMarkers";
import { filterStopsWithUsualRoutes } from "../lib/stopUtils";

const OpenMapTilesStyle = "https://tiles.openfreemap.org/styles/bright";

interface StopMapProps {
  latitude: number;
  longitude: number;
  stops: Stop[];
}

export default function StopMap({ latitude, longitude, stops }: StopMapProps) {
  const geoControlRef = useRef<maplibregl.GeolocateControl>(null);
  useEffect(() => {
    // Activate geolocation as soon as the control is loaded
    geoControlRef.current?.trigger();
    // Having this dependency is necessary otherwise the geolocation will not be
    // triggered eventhough linter complains about it.
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoControlRef.current]);

  const defaultZoom = 14;
  return (
    <Map
      mapStyle={OpenMapTilesStyle}
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: defaultZoom,
      }}
      style={{ height: 250, borderRadius: "12px" }}
      attributionControl={false}
    >
      <GeolocateControl
        ref={geoControlRef}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserLocation={true}
        showAccuracyCircle={true}
        fitBoundsOptions={{
          zoom: defaultZoom,
        }}
      />
      <NavigationControl position="bottom-right" />
      <StopMarkers stops={filterStopsWithUsualRoutes(stops)} />
    </Map>
  );
}
