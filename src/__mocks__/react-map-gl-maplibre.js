// Mock for react-map-gl/maplibre
import React from "react";

// Mock Map component
export const Map = ({ children, ...props }) => {
  return React.createElement(
    "div",
    {
      "data-testid": "map",
      ...props,
    },
    children,
  );
};

// Mock Marker component
export const Marker = ({ children, ...props }) => {
  return React.createElement(
    "div",
    {
      "data-testid": "marker",
      ...props,
    },
    children,
  );
};

// Mock GeolocateControl component
export const GeolocateControl = (props) => {
  return React.createElement("div", {
    "data-testid": "geolocate-control",
    ...props,
  });
};

// Mock NavigationControl component
export const NavigationControl = (props) => {
  return React.createElement("div", {
    "data-testid": "navigation-control",
    ...props,
  });
};

// Mock any other exports that might be used
export const Source = ({ children, ...props }) => {
  return React.createElement(
    "div",
    {
      "data-testid": "source",
      ...props,
    },
    children,
  );
};

export const Layer = (props) => {
  return React.createElement("div", {
    "data-testid": "layer",
    ...props,
  });
};
