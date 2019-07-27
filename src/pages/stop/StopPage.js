import React from "react";
import PropTypes from 'prop-types';
import './StopPage.css'
import LazyLoadingPage from "../LazyLoadingPage";
import ListOfRouteLogos from "../../shared/routelogo/ListOfRouteLogos";
import RouteLogo from "../../shared/routelogo/RouteLogo";
import {Header} from "../../util/Header";
import {Link} from "react-router-dom";
import {List, ListElement} from "../../util/List";


function SiblingStop(props) {
  return (
    <Link to={{pathname: "/stops/" + props.stopId, state: {stopName: props.name}}}>
      <ListElement className="SiblingStop">
        <ListOfRouteLogos routeIds={props.routeIds}/>
        <div className="name">{props.name}</div>
      </ListElement>
    </Link>
  )
}


function TripStopTime(props) {
  let displayTime = "";
  if (props.time < 30) {
    displayTime = "Arr"
  } else if (props.time < 60) {
    displayTime = String.fromCharCode(189)
  } else {
    displayTime = Math.floor(props.time / 60)
  }

  return (
    <Link
      to={{
        pathname: "/routes/" + props.routeId + "/" + props.tripId,
        state: {lastStopName: props.lastStopName}
      }}>
      <ListElement className={"TripStopTime" + (props.evenStop ? " evenStop" : "")}>
        <div className="time">
          {displayTime}
        </div>
        <div className="route">
          <RouteLogo route={props.routeId}/>
        </div>
        <div className="lastStop">
          {props.lastStopName}
          {props.isAssigned ? "" : String.fromCharCode(160)
            + String.fromCharCode(9734)}
        </div>
      </ListElement>
    </Link>
  )
}


class StopPage extends LazyLoadingPage {

  stopId() {
    if (this.props.match != null) {
      return this.props.match.params.stopId;
    }
    return this.props.stopId;
  }

  // TODO: these should just be variables in the constructor
  className() {
    return "StopPage";
  }

  pollTime() {
    return -10000;
  }

  initialState() {
    return {
      stopName: null,
      directionNameToTripStopTimes: null,
      usualRouteIds: null,
      currentRouteIds: null,
      siblingStops: null
    };
  }

  transiterUrl() {
    return (
      "https://www.realtimerail.nyc/transiter/v1/systems/nycsubway/stops/" +
      this.stopId()
    )
  }

  transiterErrorMessage(response) {
    return "Unexpected error"
  }

  getStateFromTransiterResponse(stop) {
    let directionNameToTripStopTimes = new Map();
    for (const directionName of stop.direction_names) {
      directionNameToTripStopTimes.set(directionName, [])
    }
    for (const tripStopTime of stop.stop_time_updates) {
      directionNameToTripStopTimes.get(tripStopTime.direction_name).push(tripStopTime)
    }

    let usualRouteIds = [];
    for (const serviceMap of stop.service_maps) {
      if (serviceMap.group_id === 'weekday_day') {
        serviceMap.routes.forEach(
          route => usualRouteIds.push(route.id)
        )
      }
    }

    let siblingStops = [];
    if (stop.parent_stop != null) {
      siblingStops = stop.parent_stop.child_stops;
    }

    return {
      stopName: stop.name,
      directionNameToTripStopTimes: directionNameToTripStopTimes,
      usualRouteIds: usualRouteIds,
      siblingStops: siblingStops
    }
  }

  stopName() {
    return this.state.stopName != null ? this.state.stopName : (
      this.props.location != null ? this.props.location.state.stopName : (
        this.props.stopName
      )
    )
  }

  header() {
    return (
      <div className="header">
        {this.stopName()}
      </div>
    )
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      pageStatus: "LOADING"
    });
    this.pollTransiter()
  }

  body() {

    let currentTime = Math.round((new Date()).getTime() / 1000);

    let directionNameElements = [];
    let allAssigned = true;
    for (const [directionName, tripStopTimes] of this.state.directionNameToTripStopTimes) {
      let internalElements = [];
      internalElements.push(
        <Header key="header">
          {directionName}
        </Header>
      );
      if (tripStopTimes.length === 0) {
        internalElements.push(
          <div key="noTrainsScheduled" className="noTrainsScheduled">
            No trains scheduled
          </div>
        );
      } else {
        let tripStopTimeElements = [];
        for (const tripStopTime of tripStopTimes) {

          let tripTime = tripStopTime.arrival_time;
          if (tripTime == null) {
            tripTime = tripStopTime.departure_time;
          }

          let isAssigned = (
            tripStopTime.trip.current_status != null ||
            tripStopTime.trip.current_stop_sequence !== 0
          );
          allAssigned = allAssigned && isAssigned;

          tripStopTimeElements.push(
            <TripStopTime
              key={"trip" + tripStopTime.trip.id}
              lastStopName={tripStopTime.trip.last_stop.name}
              routeId={tripStopTime.trip.route.id}
              tripId={tripStopTime.trip.id}
              time={tripTime - currentTime}
              isAssigned={isAssigned}
            />
          );
        }
        internalElements.push(
          <List key="tripStopTimes">
            {tripStopTimeElements}
          </List>
        );
      }
      directionNameElements.push(internalElements)
    }
    if (!allAssigned) {
      directionNameElements.push(
        <div key="scheduledTripWarning" className="scheduledTripWarning">
          Trains marked with {String.fromCharCode(9734)} are scheduled and have not entered into service yet.
        </div>
      )
    }

    let siblingStopsPanel = null;
    if (this.state.siblingStops.length > 0) {

      let siblingStopElements = [];
      for (const siblingStop of this.state.siblingStops) {
        let routeIds = [];
        for (const serviceMap of siblingStop.service_maps) {
          if (serviceMap.group_id === "weekday_day") {
            for (const route of serviceMap.routes) {
              if (route.id.substr(-1, 1) === 'X') {
                continue
              }
              routeIds.push(route.id)
            }
            break
          }
        }
        siblingStopElements.push(
          <SiblingStop
            key={"siblingStop" + siblingStop.id}
            stopId={siblingStop.id}
            name={siblingStop.name}
            routeIds={routeIds}
          />
        )
      }
      siblingStopsPanel = (
        <div>
          <Header key="header">Other platforms at this station</Header>
          <List className="siblingStops">
            {siblingStopElements}
          </List>
        </div>
      )

    }

    return (
      <div>
        <div className="mainRoutes">
          <ListOfRouteLogos
            routeIds={this.state.usualRouteIds}/>
        </div>
        {directionNameElements}
        {siblingStopsPanel}
      </div>
    )
  }

}


StopPage.propTypes = {
  stopId: PropTypes.string,
  stopName: PropTypes.string
};

export default StopPage;
