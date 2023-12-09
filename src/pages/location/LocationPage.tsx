import React from "react";

import { useEffect, useState } from "react";
import { useHttpData } from "../http";
import { locationURL } from "../../api/api";
import { ErrorMessage, LoadingPanel } from "../../shared/basicpage/BasicPage";
import { ListStopsReply } from "../../api/types";
import ListOfStops from "../../shared/ListOfStops";

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
    return <div className="LocationPage">Error (TODO)</div>;
  }
  return (
    <div>
      <h1>Nearby stops</h1>
      <LoadingPanel loaded={location.response !== null}>
        <h3>Stops within 2 miles</h3>
        <LocationResultPage
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

type LocationResultPageProps = {
  latitude: number;
  longitude: number;
};

function LocationResultPage(props: LocationResultPageProps) {
  let url = locationURL(props.latitude, props.longitude);
  const httpData = useHttpData(url, null, ListStopsReply.fromJSON);
  if (httpData.error !== null) {
    return (
      <ErrorMessage tryAgainFunction={httpData.poll}>
        {httpData.error}
      </ErrorMessage>
    );
  }
  return (
    <LoadingPanel loaded={httpData.response !== null}>
      <ListOfStops stops={httpData.response?.stops!} />
    </LoadingPanel>
  );
}
