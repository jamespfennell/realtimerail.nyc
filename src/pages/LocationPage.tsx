import React from "react";

import { useCallback, useEffect, useState } from "react";
import { useHttpData } from "../hooks/http";
import { locationURL } from "../api/api";
import { ErrorMessage, LoadingPanel } from "../elements/BasicPage";
import { ListStopsReply } from "../api/types";
import ListOfStops from "../elements/ListOfStops";
import StopMap from "../elements/StopMap";
import { filterStopsWithUsualRoutes } from "../lib/stopUtils";

function getLocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location access denied. Please enable location permissions in your browser settings and try again.";
    case error.POSITION_UNAVAILABLE:
      return "Unable to determine your location. Please check your internet connection and try again.";
    case error.TIMEOUT:
      return "Location request timed out. Please try again.";
    default:
      return (
        "An unknown error occurred while trying to access your location." +
        (error.message
          ? ` Details: ${error.message}`
          : " Please check your device and browser settings, then try again.")
      );
  }
}

function useCurrentLocation() {
  const [location, setLocation] = useState<LocationQueryResponse>({
    response: null,
    error: null,
  });

  const fetchLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      console.log("Getting location...");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("Got location", position);
          setLocation({ response: position, error: null });
        },
        function (error) {
          console.log("Got location error", error);
          setLocation({
            response: null,
            error: getLocationErrorMessage(error),
          });
        },
      );
    } else {
      console.log("Location not supported by this browser");
      setLocation({
        response: null,
        error:
          "Geolocation is not supported by this browser. Please use a modern browser that supports location services.",
      });
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, fetchLocation };
}

export default function LocationPage() {
  const { location, fetchLocation } = useCurrentLocation();

  // If location error, show error UI with retry
  if (location.error !== null) {
    return (
      <div>
        <h1>Nearby stops</h1>
        <ErrorMessage tryAgainFunction={fetchLocation}>
          {location.error}
        </ErrorMessage>
      </div>
    );
  }

  return (
    <div>
      <h1>Nearby stops</h1>
      <LoadingPanel loaded={location.response !== null}>
        <Body
          latitude={location.response?.coords.latitude!}
          longitude={location.response?.coords.longitude!}
        />
      </LoadingPanel>
    </div>
  );
}

type LocationQueryResponse = {
  response: GeolocationPosition | null;
  error: string | null;
};

type BodyProps = {
  latitude: number;
  longitude: number;
};

function Body(props: BodyProps) {
  let url = locationURL(props.latitude, props.longitude);
  const httpData = useHttpData(url, null, ListStopsReply.fromJSON);

  // Store the stops data in state for reuse by other components
  const [stopsData, setStopsData] = useState<ListStopsReply | null>(null);

  useEffect(() => {
    if (httpData.response) {
      setStopsData(httpData.response);
    }
  }, [httpData.response]);

  if (httpData.error !== null) {
    return (
      <ErrorMessage tryAgainFunction={httpData.poll}>
        {httpData.error}
      </ErrorMessage>
    );
  }
  const filteredStops = filterStopsWithUsualRoutes(stopsData?.stops || []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <StopMap stops={filteredStops} />
      <LoadingPanel loaded={stopsData !== null}>
        <ListOfStops stops={filteredStops} orderByName={false} />
      </LoadingPanel>
    </div>
  );
}
