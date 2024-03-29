import "./ListOfStops.css";

import { Stop } from "../api/types";
import { List, ListElement } from "./List";
import ListOfRouteLogos from "./routelogo/ListOfRouteLogos";
import { Link } from "react-router-dom";

export default function ListOfStops(props: {
  stops: Stop[];
  orderByName: boolean;
}) {
  if (props.orderByName) {
    props.stops.sort(function (a, b) {
      return (a.name ?? "").localeCompare(b.name ?? "");
    });
  }
  let elements = [];
  for (const stop of props.stops) {
    let usualRouteIds: string[] = [];
    for (const serviceMap of stop.serviceMaps) {
      if (serviceMap.configId === "weekday") {
        serviceMap.routes.forEach((route) => usualRouteIds.push(route.id));
      }
    }
    if (usualRouteIds.length === 0) {
      continue;
    }
    // TODO: optionally print how far away the stops are
    elements.push(
      <Link
        to={"/stops/" + stop.id}
        state={{ stopName: stop.name }}
        key={stop.id}
      >
        <ListElement className="ListOfStopsElement">
          <ListOfRouteLogos
            routeIds={usualRouteIds}
            skipExpress={true}
            addLinks={false}
          />
          <div className="name">{stop.name}</div>
        </ListElement>
      </Link>,
    );
  }
  return <List className="List">{elements}</List>;
}
