import React from "react";
import AnimateHeight, { Height } from 'react-animate-height'
import _ from 'lodash'

import './RoutePage.css'

import RouteLogo, { replaceRouteIdsWithImages } from '../../shared/routelogo/RouteLogo'
import { timestampToDateString, timestampToDateTime } from "../../util/Time";
import parseAlert, { buildStatusFromAlerts } from '../../util/Alert'
import ServiceMap from '../../shared/servicemap/ServiceMap'
import { Route } from "../../api/types";
import withHttpData from "../http";
import { routeURL } from "../../api/api";
import BasicPage from "../../shared/basicpage/BasicPage";

export type RoutePageProps = {
  routeId: string;
}

function RoutePage(props: RoutePageProps) {
  return (
    <div className="RoutePage">
      <BasicPageForRoute
        httpUrl={routeURL(props.routeId)}
        httpPollInternal={null}
        routeId={props.routeId}
        header={Header}
        body={Body} />
    </div>
  )
}

let BasicPageForRoute = withHttpData(BasicPage, Route.fromJSON)

function Header(props: any) {
  return (
    <div key="header">
      <RouteLogo route={props.routeId} />
    </div>
  )
}

function Body(route: Route) {
  let configIdToServiceMap = new Map();
  for (const serviceMap of route.serviceMaps) {
    configIdToServiceMap.set(serviceMap.configId, serviceMap.stops)
  }

  let activeStopIds = new Set();
  for (const stop of configIdToServiceMap.get('realtime')) {
    activeStopIds.add(stop.id)
  }
  let realtimeService = activeStopIds.size > 0

  let stops = [];
  for (const stop of configIdToServiceMap.get('alltimes')) {
    stop.isActive = activeStopIds.has(stop.id);
    stops.push(stop)
  }

  return (
    <div>
      <StatusPanel
        realtimeService={realtimeService}
        alerts={route.alerts}
        periodicity={route.periodicity} />
      <ServiceMap
        stops={stops}
        color={"#" + route.color}
        type="Route"
      />
    </div>
  )
}

function Alerts(props: any) {
  let alertElements = [];
  for (const alert of props.alerts) {
    let timeMessage = "";
    if (alert.active_period.ends_time != null) {
      timeMessage += "In effect from " + timestampToDateString(alert.active_period.starts_at) + " to "
        + timestampToDateString(alert.active_period.ends_time)
    } else {
      timeMessage += "Alert posted " + timestampToDateTime(alert.active_period.starts_at)
    }
    timeMessage += ".";

    const parsedAlert = parseAlert(alert);
    alertElements.push(
      <div key={alert.id} className="Alert">
        <div className="header">{parsedAlert.header}</div>
        <div className="description">{replaceRouteIdsWithImages(parsedAlert.description)}</div>
        <div className="timeMessage">{timeMessage}</div>
      </div>
    )
  }

  return (
    <div className="Alerts">
      {alertElements}
    </div>
  );
}

function StatusSummaryHeader(props: any) {
  let statusToColorClass = {
    "SERVICE_CHANGE": "Orange",
    "DELAYS": "Red",
    "GOOD_SERVICE": "Green",
    "NO_SERVICE": "White"
  };
  let statusToText = {
    "SERVICE_CHANGE": "Service Change",
    "DELAYS": "Delays",
    "GOOD_SERVICE": "Good Service",
    "NO_SERVICE": "No Service"
  };

  return (
    <div className={"StatusSummaryHeader " + _.get(statusToColorClass, props.status, "GOOD_SERVICE")}>
      {_.get(statusToText, props.status, "Good Service")}
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
    let p = Math.round(props.periodicity);
    if (!isNaN(p)) {
      messageText = "Trains running about every " + p + " minutes"
    }
  } else if (props.status === "NO_SERVICE") {
    messageText = "Find alternative trains below"
  }

  let arrow = <div />;
  if (props.canToggleAlerts) {
    if (props.alertsVisible) {
      arrow = <div className="arrow arrowUp" />
    } else {
      arrow = <div className="arrow arrowDown" />
    }
  }

  return (
    <div className="StatusSummaryMessage">
      {arrow}
      <div className="message">{messageText}</div>
    </div>
  )
}

type StatusPanelProps = {
  alerts: any;
  realtimeService: boolean;
  periodicity: number | undefined;
}

type StatusPanelState = {
  alertsVisible: boolean;
}

class StatusPanel extends React.Component<StatusPanelProps> {
  state: StatusPanelState;

  constructor(props: StatusPanelProps) {
    super(props);
    this.state = {
      alertsVisible: false
    };
  }

  canToggleAlerts = () => {
    return (this.props.alerts.length > 0);
  };

  toggleAlerts = (event: any) => {
    if (!this.canToggleAlerts()) {
      return;
    }
    this.setState({
      alertsVisible: !this.state.alertsVisible
    });
  };

  render() {
    let statusSummaryClasses = "StatusSummary noTextSelect";
    if (this.canToggleAlerts()) {
      statusSummaryClasses += " pointer"
    }

    let height: Height = this.state.alertsVisible ? 'auto' : 0;

    let status = buildStatusFromAlerts(this.props.alerts)
    if (status === "GOOD_SERVICE" && !this.props.realtimeService) {
      status = "NO_SERVICE"
    }

    return (
      <div>
        <div onClick={this.toggleAlerts} className={statusSummaryClasses}>
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
          animateOpacity={true}
          duration={400}
          height={height}>
          <Alerts
            alerts={this.props.alerts}
            alertsVisible={this.state.alertsVisible}
          /></AnimateHeight>
      </div>
    )
  }
}

export default RoutePage;
