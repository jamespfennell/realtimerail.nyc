import './HomePage.css'

import { Link } from "react-router-dom";

import RouteLogo from '../../shared/routelogo/RouteLogo'
import { buildStatusFromAlerts } from '../../util/Alert'
import { listRoutesURL } from "../../api/api";
import { Alert_Preview, ListRoutesReply } from "../../api/types";
import { useHttpData } from "../http";

const layout = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "G", "L"],
  ["A", "C", "E"],
  ["B", "D", "F", "M"],
  ["N", "Q", "R", "W"],
  ["J", "Z", "SI"],
  ["H", "FS", "GS"]
];

let routeIdToDescription = new Map()
routeIdToDescription.set("H", "Rockaways shuttle");
routeIdToDescription.set("FS", "Franklin Av shuttle");
routeIdToDescription.set("GS", "42nd street shuttle");

export default function HomePage() {
  const alertsData = useHttpData(listRoutesURL(), null, ListRoutesReply.fromJSON);
  let routeIdToAlerts: Map<string, Alert_Preview[]> = new Map();
  if (alertsData.response != null) {
    for (const route of alertsData.response.routes) {
      routeIdToAlerts.set(route.id, route.alerts)
    }
  }

  let grid = [];
  let i = 0;
  for (const routeIds of layout) {
    i++;
    let row = [];
    for (const routeId of routeIds) {
      let alerts: Alert_Preview[] = [];
      let alertsOr = routeIdToAlerts.get(routeId);
      if (alertsOr !== undefined) {
        alerts = alertsOr;
      }
      row.push(
        <RouteButton
          route={routeId}
          key={routeId}
          alerts={alerts}
          description={get(routeIdToDescription, routeId, "")}
        />
      )
    }
    grid.push(
      <div className="row" key={i}>
        {row}
      </div>
    );
  }
  return (
    <div className="HomePage">
      <div className="routeGrid">
        {grid}
      </div>
    </div>
  );
}

type RouteButtonProps = {
  route: string;
  alerts: Alert_Preview[];
  description: string;
}

function RouteButton(props: RouteButtonProps) {
  let statusToColorClass = new Map()
  statusToColorClass.set("SERVICE_CHANGE", "Orange")
  statusToColorClass.set("DELAYS", "Red")
  let status = buildStatusFromAlerts(props.alerts)
  let statusClasses = "statusCircle " + get(statusToColorClass, status, "");
  let buttonClasses = "cell";

  let descriptionElement = null;
  if (props.description !== "") {
    descriptionElement = <div className="description">{props.description}</div>
  }

  return (
    <div className={buttonClasses}>
      <Link to={"/routes/" + props.route}>
        <div className={statusClasses} />
        <RouteLogo route={props.route} />
        {descriptionElement}
      </Link>
    </div>
  )
}

function get(m: Map<string, string>, key: string, fallback: string): string {
  const value = m.get(key)
  if (value !== undefined) {
    return value
  }
  return fallback
}
