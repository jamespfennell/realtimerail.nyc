import React from "react";
import PropTypes from 'prop-types';
import './StopPage.css'
import LazyLoadingPage from "../LazyLoadingPage";
import ListOfRouteLogos from "../../shared/routelogo/ListOfRouteLogos";
import RouteLogo from "../../shared/routelogo/RouteLogo";
import {Header} from "../../util/Header";




function TripStopTime(props) {
  let displayTime = "";
  if (props.time < 30) {
    displayTime = "Arr"
  } else if (props.time < 60) {
    displayTime = String.fromCharCode(189)
  } else {
    displayTime = Math.floor(props.time/60)
  }

  return (
    <div className={"TripInStop" + (props.evenStop ? " evenStop" : "")}>
      <div className="time">
        {displayTime}
      </div>
      <div className="route">
        <RouteLogo route={props.routeId} />
      </div>
      <div className="lastStop">
        {props.lastStopName}
        {props.isAssigned ? "" : String.fromCharCode(160)
          + String.fromCharCode(9734)}
      </div>
    </div>
  )
}



class StopPage extends LazyLoadingPage {

  className() {
    return "StopPage";
  }

  initialState() {
    return {
      stopName: null,
      directionNameToTripStopTimes: null,
      usualRouteIds: null,
      currentRouteIds: null
    };
  }

  transiterUrl() {
    return (
      "https://www.realtimerail.nyc/transiter/v1/systems/nycsubway/stops/" +
      this.props.stopId
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


    return {
      stopName: stop.name,
      directionNameToTripStopTimes: directionNameToTripStopTimes,
      usualRouteIds: usualRouteIds
    }
  }

  header() {
    return (
      <div className="header">
        {this.state.stopName == null ? this.props.stopName : this.state.stopName}
      </div>
    )
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
          <div key="noTrainsScheduled">
            No trains scheduled.
          </div>
        )
      }

      let position = 0;
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

        internalElements.push(
          <TripStopTime
            key={"trip" + tripStopTime.trip.id}
            lastStopName={tripStopTime.trip.last_stop.name}
            routeId={tripStopTime.trip.route.id}
            time={tripTime - currentTime}
            evenStop={position % 2 === 0}
            isAssigned={isAssigned}
          />
        );
        position += 1
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



    return (
      <div>
      <div className="mainRoutes">
        <ListOfRouteLogos
          routeIds={this.state.usualRouteIds} />
      </div>
        {directionNameElements}
      </div>
    )
  }

}


StopPage.propTypes = {
  stopId: PropTypes.string,
  stopName: PropTypes.string
};

export default StopPage;
