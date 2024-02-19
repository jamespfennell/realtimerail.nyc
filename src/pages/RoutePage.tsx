import React from "react";
import AnimateHeight, { Height } from "react-animate-height";

import "./RoutePage.css";

import RouteLogo, {
  replaceRouteIdsWithImages,
  RouteId,
  routeIdToDefaultColor,
} from "../elements/routelogo/RouteLogo";
import parseAlert, { buildStatusFromAlerts } from "../elements/Alert";
import ServiceMap from "../elements/servicemap/ServiceMap";
import { Alert_Reference, ListAlertsReply, Route } from "../api/types";
import { useHttpData } from "../hooks/http";
import { routeURL, alertsURL } from "../api/api";
import BasicPage from "../elements/BasicPage";

export type RoutePageProps = {
  routeId: string;
};

function RoutePage(props: RoutePageProps) {
  const httpData = useHttpData(routeURL(props.routeId), null, Route.fromJSON);
  return (
    <div className="RoutePage">
      <div key="header">
        <RouteLogo route={props.routeId} />
      </div>
      <BasicPage httpData={httpData} body={Body} />
    </div>
  );
}

function Body(route: Route) {
  let configIdToServiceMap = new Map();
  for (const serviceMap of route.serviceMaps) {
    configIdToServiceMap.set(serviceMap.configId, serviceMap.stops);
  }

  let activeStopIds = new Set();
  for (const stop of configIdToServiceMap.get("realtime")) {
    activeStopIds.add(stop.id);
  }
  let realtimeService = activeStopIds.size > 0;

  let stops = [];
  for (const stop of configIdToServiceMap.get("alltimes")) {
    stop.isActive = activeStopIds.has(stop.id);
    stops.push(stop);
  }

  return (
    <div>
      <StatusPanel
        realtimeService={realtimeService}
        alerts={route.alerts}
        periodicity={route.estimatedHeadway}
      />
      <ServiceMap
        stops={stops}
        color={
          "#" + (route.color || routeIdToDefaultColor[route.id as RouteId])
        }
        type="Route"
        showTimes={false}
      />
    </div>
  );
}

export type AlertsProps = {
  alerts: Alert_Reference[];
};

function Alerts(props: AlertsProps) {
  let alertIDs = [];
  for (const alert of props.alerts) {
    alertIDs.push(alert.id);
  }

  const httpData = useHttpData(
    alertsURL(alertIDs),
    null,
    ListAlertsReply.fromJSON,
  );
  if (httpData.response === null) {
    return <div className="Alerts">loading</div>;
  }
  let alertElements = [];
  for (const alert of httpData.response.alerts) {
    const parsedAlert = parseAlert(alert);
    console.log(alert.id);
    alertElements.push(
      <div key={alert.id} className="Alert">
        <div className="header">
          {replaceRouteIdsWithImages(parsedAlert.header)}
        </div>
        <div className="description">
          {replaceRouteIdsWithImages(parsedAlert.description)}
        </div>
        <div className="timeMessage">{parsedAlert.activePeriodMessage}</div>
      </div>,
    );
  }
  return <div className="Alerts">{alertElements}</div>;
}

function StatusSummaryHeader(props: any) {
  let statusToColorClass = new Map();
  statusToColorClass.set("SERVICE_CHANGE", "Orange");
  statusToColorClass.set("DELAYS", "Red");
  statusToColorClass.set("GOOD_SERVICE", "Green");
  statusToColorClass.set("NO_SERVICE", "White");

  let statusToText = new Map();
  statusToText.set("SERVICE_CHANGE", "Service Change");
  statusToText.set("DELAYS", "Delays");
  statusToText.set("GOOD_SERVICE", "Good Service");
  statusToText.set("NO_SERVICE", "No Service");

  return (
    <div
      className={
        "StatusSummaryHeader " +
        get(statusToColorClass, props.status, "GOOD_SERVICE")
      }
    >
      {get(statusToText, props.status, "Good Service")}
    </div>
  );
}

function StatusSummaryMessage(props: any) {
  let messageText = "";
  if (props.numberOfAlerts > 0) {
    messageText = "View " + props.numberOfAlerts + " service alert";
    if (props.numberOfAlerts > 1) {
      messageText += "s";
    }
  } else if (props.status === "GOOD_SERVICE") {
    if (props.periodicity !== null) {
      let mins = Math.round(props.periodicity / 60);
      if (!isNaN(mins)) {
        messageText = "Trains running about every " + mins + " minutes";
      }
    }
  } else if (props.status === "NO_SERVICE") {
    messageText = "Find alternative trains below";
  }

  let arrow = <div />;
  if (props.canToggleAlerts) {
    if (props.alertsVisible) {
      arrow = <div className="arrow arrowUp" />;
    } else {
      arrow = <div className="arrow arrowDown" />;
    }
  }

  return (
    <div className="StatusSummaryMessage">
      {arrow}
      <div className="message">{messageText}</div>
    </div>
  );
}

type StatusPanelProps = {
  alerts: Alert_Reference[];
  realtimeService: boolean;
  periodicity: number | undefined;
};

type StatusPanelState = {
  alertsVisible: boolean;
};

class StatusPanel extends React.Component<StatusPanelProps> {
  state: StatusPanelState;

  constructor(props: StatusPanelProps) {
    super(props);
    this.state = {
      alertsVisible: false,
    };
  }

  canToggleAlerts = () => {
    return this.props.alerts.length > 0;
  };

  toggleAlerts = (_event: any) => {
    if (!this.canToggleAlerts()) {
      return;
    }
    this.setState({
      alertsVisible: !this.state.alertsVisible,
    });
  };

  render() {
    let statusSummaryClasses = "StatusSummary noTextSelect";
    if (this.canToggleAlerts()) {
      statusSummaryClasses += " pointer";
    }

    let height: Height = this.state.alertsVisible ? "auto" : 0;

    let status = buildStatusFromAlerts(this.props.alerts);
    if (status === "GOOD_SERVICE" && !this.props.realtimeService) {
      status = "NO_SERVICE";
    }

    if (this.props.alerts.length === 0) {
      return (
        <div>
          <div onClick={this.toggleAlerts} className={statusSummaryClasses}>
            <StatusSummaryHeader status={status} />
            <StatusSummaryMessage
              canToggleAlerts={false}
              status={status}
              periodicity={this.props.periodicity}
              numberOfAlerts={this.props.alerts.length}
              alertsVisible={this.state.alertsVisible}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div
          key="header"
          onClick={this.toggleAlerts}
          className={statusSummaryClasses}
        >
          <StatusSummaryHeader status={status} />
          <StatusSummaryMessage
            canToggleAlerts={this.canToggleAlerts()}
            status={status}
            periodicity={this.props.periodicity}
            numberOfAlerts={this.props.alerts.length}
            alertsVisible={this.state.alertsVisible}
          />
        </div>
        <AnimateHeight
          key="body"
          animateOpacity={true}
          duration={400}
          height={height}
        >
          <Alerts key="alerts" alerts={this.props.alerts} />
        </AnimateHeight>
      </div>
    );
  }
}

function get(m: Map<string, string>, key: string, fallback: string): string {
  const value = m.get(key);
  if (value !== undefined) {
    return value;
  }
  return fallback;
}

export default RoutePage;
