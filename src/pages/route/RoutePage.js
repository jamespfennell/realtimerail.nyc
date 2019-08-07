import React from "react";
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height'

import _ from 'lodash'
import RouteLogo, {replaceRouteIdsWithImages} from '../../shared/routelogo/RouteLogo'
import {timestampToDateString, timestampToTime} from "../../util/Time";

import './RoutePage.css'

import ServiceMap from '../../shared/servicemap/ServiceMap'
import LazyLoadingPage from "../LazyLoadingPage";


function Alerts(props) {
  let alertElements = [];
  for (const alert of props.alerts) {


    let timeMessage = "";
    if (alert.end_time != null) {
      timeMessage += "In effect from " + timestampToDateString(alert.start_time) + " to "
        + timestampToDateString(alert.end_time)
    } else {
      timeMessage += "Alert posted " + timestampToTime(alert.start_time) + ", " + timestampToDateString(alert.creation_time)
    }
    timeMessage += ".";


    alertElements.push(
      <div key={alert.id} className="Alert">
        <div className="header">{alert.header}</div>
        <div className="description">{replaceRouteIdsWithImages(alert.description)}</div>
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


function StatusSummaryHeader(props) {
  let statusToColorClass = {
    "PLANNED_SERVICE_CHANGE": "Orange",
    "UNPLANNED_SERVICE_CHANGE": "Orange",
    "DELAYS": "Red",
    "GOOD_SERVICE": "Green",
    "NO_SERVICE": "White"
  };
  let statusToText = {
    "PLANNED_SERVICE_CHANGE": "Planned Work",
    "UNPLANNED_SERVICE_CHANGE": "Service Change",
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

function StatusSummaryMessage(props) {

  let messageText = "";
  if (props.numberOfAlerts > 0) {
    messageText = "View " + props.numberOfAlerts + " service alert";
    if (props.numberOfAlerts > 1) {
      messageText += "s";
    }
  } else if (props.status === "GOOD_SERVICE") {
    messageText = "Trains running about every " + Math.round(props.periodicity) + " minutes"
  } else if (props.status === "NO_SERVICE") {
    messageText = "Find alternative trains below"
  }

  let arrow = <div/>;
  if (props.canToggleAlerts) {
    if (props.alertsVisible) {
      arrow = <div className="arrow arrowUp"/>
    } else {
      arrow = <div className="arrow arrowDown"/>
    }
  }

  return (
    <div className="StatusSummaryMessage">
      {arrow}
      <div className="message">{messageText}</div>
    </div>
  )
}


class StatusPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertsVisible: false
    };
  }

  canToggleAlerts = () => {
    return (this.props.alerts.length > 0);
  };

  toggleAlerts = (event) => {
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

    let height = this.state.alertsVisible ? 'auto' : 0;

    return (
      <div>
        <div onClick={this.toggleAlerts} className={statusSummaryClasses}>
          <StatusSummaryHeader status={this.props.status}/>
          <StatusSummaryMessage
            canToggleAlerts={this.canToggleAlerts()}
            status={this.props.status}
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


class RoutePage extends LazyLoadingPage {

  routeId() {
    if (this.props.match != null) {
      return this.props.match.params.routeId;
    }
    return this.props.routeId;
  }

  className() {
    return "RoutePage"
  }

  initialState() {
    return {
      alerts: [],
      stops: [],
      periodicity: null
    }
  }

  transiterUrl() {
    return "https://www.realtimerail.nyc/transiter/v1/systems/nycsubway/routes/"
      + this.routeId();
  }

  getStateFromTransiterResponse(response) {
    // for (const route of response) {
    //  routeIdToStatus[route.id] = route.status
    //}
    let groupIdToServiceMap = {};
    for (const serviceMap of response.service_maps) {
      groupIdToServiceMap[serviceMap.group_id] = serviceMap.stops
    }

    let activeStopIds = new Set();
    for (const stop of groupIdToServiceMap['realtime']) {
      activeStopIds.add(stop.id)
    }

    let stops = [];
    for (const stop of groupIdToServiceMap['any_time']) {
      stop.isActive = activeStopIds.has(stop.id);
      stops.push(stop)
    }

    return {
      routeStatus: response.status,
      alerts: response.alerts,
      stops: stops,
      periodicity: response.periodicity,
      color: "#" + response.color
    }
  }

  header() {
    return (
      <RouteLogo route={this.routeId()}/>
    )
  }

  body() {
    return (
      <div>
        <StatusPanel
          status={this.state.routeStatus}
          alerts={this.state.alerts}
          periodicity={this.state.periodicity}/>
        <ServiceMap
          stops={this.state.stops}
          color={this.state.color}
          type="Route"
        />
      </div>
    )
  }
}

RoutePage.propTypes = {
  routeId: PropTypes.string
};

export default RoutePage;
