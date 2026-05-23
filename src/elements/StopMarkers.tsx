import React from "react";
import { Marker } from "react-map-gl/maplibre";
import { Stop } from "../api/types";
import RouteLogo from "./routelogo/RouteLogo";
import { getUsualRouteIds } from "../lib/stopUtils";
import { sortRouteIds } from "./routelogo/ListOfRouteLogos";
import { Link } from "react-router-dom";

interface StopMarkersProps {
  stops: Stop[];
}

export default function StopMarkers({ stops }: StopMarkersProps) {
  return (
    <div className="StopMarkers">
      {// Reverse the stops to show the nearlest stop on top if there is overlap.
      stops?.reverse().map((stop) => {
        const usualRouteIds = sortRouteIds(getUsualRouteIds(stop));
        return (
          <Marker
            key={stop.id}
            latitude={stop.latitude!}
            longitude={stop.longitude!}
            anchor="bottom-left"
            offset={[6, 6]} // To anchor to the center of the circle in the marker div below.
          >
            <Link
              to={"/stops/" + stop.id}
              state={{ stopName: stop.name }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <div
                  style={{
                    backgroundColor: "lightseagreen",
                    borderRadius: "50%",
                    width: "12px",
                    height: "12px",
                    border: "2px solid white",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                  title={stop.name || stop.id}
                />
                <div
                  style={{
                    backgroundColor: "white",
                    color: "#333",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  {usualRouteIds.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      {/* Show all route logos */}
                      {usualRouteIds.map((routeId) => (
                        <div
                          key={routeId}
                          style={{ width: "16px", height: "16px" }}
                        >
                          <RouteLogo route={routeId} />
                        </div>
                      ))}
                    </div>
                  )}
                  <span>{stop.name || stop.id}</span>
                </div>
              </div>
            </Link>
          </Marker>
        );
      })}
    </div>
  );
}
