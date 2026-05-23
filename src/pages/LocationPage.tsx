import React from "react";

import { useEffect, useState } from "react";
import { useHttpData } from "../hooks/http";
import { locationURL } from "../api/api";
import { ErrorMessage, LoadingPanel } from "../elements/BasicPage";
import { ListStopsReply } from "../api/types";
import ListOfStops from "../elements/ListOfStops";
import StopMap from "../elements/StopMap";
import { filterStopsWithUsualRoutes } from "../lib/stopUtils";

export default function LocationPage() {
  const [location, setLocation] = useState<LocationQueryResponse>({
    response: null,
    error: null,
  });
  // need to useState then have an if statement based on the result below. That's it!
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Getting location...");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("Got location");
          setLocation((prev) => {
            // TODO: is there a better way of just getting the location once than this?
            // Also we should get it every 5 seconds
            if (prev.response !== null) {
              return prev;
            }
            return { response: position, error: null };
          });
        },
        function (error) {
          console.log("Location error:", error);
          setLocation((_) => {
            return { response: null, error: error };
          });
        },
      );
    } else {
      // TODO: error here too
      console.log("Location not supported by this browser");
    }
  });

  if (location.error !== null) {
    return (
      <div className="LocationPage">
        Error fetching location: {location.error.message}
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
  error: GeolocationPositionError | null;
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
      <StopMap
        latitude={props.latitude}
        longitude={props.longitude}
        stops={filteredStops}
      />
      <LoadingPanel loaded={stopsData !== null}>
        <ListOfStops stops={filteredStops} orderByName={false} />
      </LoadingPanel>
    </div>
  );
}
