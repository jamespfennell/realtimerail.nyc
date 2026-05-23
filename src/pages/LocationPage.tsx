import React from "react";

import { useCallback, useEffect, useState } from "react";
import { useHttpData } from "../hooks/http";
import { locationURL } from "../api/api";
import { ErrorMessage, LoadingPanel } from "../elements/BasicPage";
import { ListStopsReply, Stop } from "../api/types";
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
  return (
    <div>
      <h1>Nearby stops</h1>
      <Body />
    </div>
  );
}

function Body() {
  // State for the current location and nearby stops.
  const { location, fetchLocation } = useCurrentLocation();
  const [stops, setStops] = useState<Stop[]>([]);

  // ListStops request is issued if we have the location.
  const url =
    location.response !== null
      ? locationURL(
          location.response.coords.latitude,
          location.response.coords.longitude,
        )
      : "";
  const listStopsHttpData = useHttpData(url, null, ListStopsReply.fromJSON);

  useEffect(() => {
    if (listStopsHttpData.response) {
      setStops(filterStopsWithUsualRoutes(listStopsHttpData.response.stops));
    }
  }, [listStopsHttpData.response]);

  // If the location fetch had an error, show the error with retry.
  if (location.error !== null) {
    return (
      <ErrorMessage tryAgainFunction={fetchLocation}>
        {location.error}
      </ErrorMessage>
    );
  }

  // If the list stops request had an error, show the error retry.
  if (listStopsHttpData.error !== null) {
    return (
      <ErrorMessage tryAgainFunction={listStopsHttpData.poll}>
        {listStopsHttpData.error}
      </ErrorMessage>
    );
  }

  // Display the stop map regardless of the whether we have the nearby stops,
  // since we can show the map immediately.
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <StopMap stops={stops} />
      <LoadingPanel loaded={listStopsHttpData.response !== null}>
        <ListOfStops stops={stops} orderByName={false} />
      </LoadingPanel>
    </div>
  );
}

type LocationQueryResponse = {
  response: GeolocationPosition | null;
  error: string | null;
};
