import React from "react";
import PropTypes from 'prop-types';
import RouteLogo from '../../shared/routelogo/RouteLogo'

import {timestampToDateString, timestampToTime, timestampToTimeElapsed} from '../../util/Time'
import ServiceMap, {StopData} from '../../shared/servicemap/ServiceMap'
import {Header} from '../../util/Header'
import './TripPage.css'
import LazyLoadingPage from "../LazyLoadingPage";
import {Link} from 'react-router-dom'

function TripPageHeader(props) {
  let firstStopName = props.firstStopName;
  if (props.firstStopName === undefined || props.firstStopName === null) {
    firstStopName = props.routeId + " Train"
  }
  return (
    <div className="TripPageHeader">
      <div className="routeLogo">
        <Link to={"/routes/" + props.routeId}>
          <RouteLogo route={props.routeId}/>
        </Link>
      </div>
      <div className="details">
        <div className="big">{firstStopName}</div>
        <div className="small">to</div>
        <div className="big">{props.lastStopName}</div>
      </div>
    </div>
  )
}

function TripData(props) {
  let valueClasses = "value";
  if (props.code === true) {
    valueClasses += " code";
  }
  return (
    <div className="TripData">
      <div className="dataKey">{props.dataKey}:</div>
      <div className={valueClasses}>{props.value}</div>
    </div>
  )
}

class TripPage extends LazyLoadingPage {

  className() {
    return "TripPage";
  }

  initialState() {
    return {
      stops: null,
      vehicleId: null,
      lastStop: null
    };
  }

  routeId() {
    return this.props.match != null ? this.props.match.params.routeId : this.props.routeId
  }

  tripId() {
    return this.props.match != null ? this.props.match.params.tripId : this.props.tripId
  }

  transiterUrl() {
    return (
      "https://www.realtimerail.nyc/transiter/v1/systems/nycsubway/routes/" +
      this.routeId() +
      "/trips/" +
      this.tripId()
    )
  }

  transiterErrorMessage(response) {
    return "This trip no longer exists"
  }

  getStateFromTransiterResponse(response) {
    // for (const route of response) {
    //  routeIdToStatus[route.id] = route.status
    //
    let nextStop = null;
    let future = false;
    let stops = [];
    for (const tripStopTime of response.stop_time_updates) {

      let time = tripStopTime.arrival_time;
      if (time == null) {
        time = tripStopTime.departure_time;
      }
      let stop = new StopData(
        tripStopTime.stop.id.substr(0, tripStopTime.stop.id.length - 1),
        tripStopTime.stop.name,
        timestampToTime(time),
        true
      );
      if (tripStopTime.future === true && future === false) {
        future = true;
        nextStop = tripStopTime.stop
      }
      stops.push(stop);
    }

    return {
      stops: stops,
      color: "#" + response.route.color,
      lastUpdated: response.last_update_time,
      vehicleId: response.vehicle_id,
      startTime: response.start_time,
      nextStop: nextStop
    }
  }

  header() {
    return (
      <TripPageHeader
        routeId={this.routeId()}
        firstStopName={
          this.state.stops == null
            ? null
            : this.state.stops[0].name}
        lastStopName={
          this.state.stops == null
            ? (
              this.props.location != null ? this.props.location.state.lastStopName : (
                this.props.lastStopName
              )
            )
            : this.state.stops[this.state.stops.length - 1].name}
      />
    )
  }

  body() {
    return (
      <div>
        <TripData
          dataKey="Last updated"
          value={timestampToTimeElapsed(this.state.lastUpdated)}
        />
        <TripData dataKey="Next stop" value={this.state.nextStop.name}/>
        <ServiceMap
          stops={this.state.stops}
          color={this.state.color}
          showTimes={true}
        />
        <Header>Additional trip details</Header>
        <TripData dataKey="Trip ID" value={this.tripId()} code={true}/>
        <TripData dataKey="Vehicle ID" value={this.state.vehicleId} code={true}/>
        <TripData dataKey="Start time"
                  value={timestampToTime(this.state.startTime) + ", " + timestampToDateString(this.state.startTime)}/>
      </div>
    )
  }

}


TripPage.propTypes = {
  routeId: PropTypes.string,
  tripId: PropTypes.string,
  lastStopName: PropTypes.string
};

export default TripPage;
