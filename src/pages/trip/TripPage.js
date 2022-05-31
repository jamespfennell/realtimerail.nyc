import React from "react";
import PropTypes from 'prop-types';
import RouteLogo from '../../shared/routelogo/RouteLogo'

import {timestampToDateTime, timestampToTime, timestampToTimeElapsed} from '../../util/Time'
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
  if (props.value === "") {
    return null
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
    if (this.props.match != null && this.props.match.params != null) {
      return this.props.match.params.routeId
    }
    return this.props.routeId
  }

  tripId() {
    if (this.props.match != null && this.props.match.params != null) {
      return this.props.match.params.tripId
    }
    return this.props.tripId
  }

  lastStopName() {
    if (this.state.stops != null) {
      return this.state.stops[this.state.stops.length - 1].name
    }
    if (this.props.location != null && this.props.location.state != null) {
      return this.props.location.state.lastStopName
    }
    return this.props.lastStopName
  }

  transiterUrl() {
    return (
      "systems/us-ny-subway/routes/" +
      this.routeId() +
      "/trips/" +
      this.tripId()
    )
  }

  transiterErrorMessage(response) {
    if (response.status === 404) {
      return "this trip no longer exists"
    }
    return "error retrieving data"
  }

  getStateFromTransiterResponse(response) {
    let nextStop = null;
    let future = false;
    let stops = [];
    for (const tripStopTime of response.stopTimes) {

      let time = tripStopTime.arrival.time;
      if (time == null) {
        time = tripStopTime.departure.time;
      }
      let stop = new StopData(
        tripStopTime.stop.id.substr(0, tripStopTime.stop.id.length - 1),
        tripStopTime.stop.name,
        timestampToTime(time),
        tripStopTime.future
      );
      if (tripStopTime.future === true && future === false) {
        future = true;
        nextStop = tripStopTime.stop
      }
      stops.push(stop);
    }

    let vehicleId = ""
    if (response.vehicle != null) {
      vehicleId = response.vehicle.id
    }
    return {
      stops: stops,
      color: "#" + response.route.color,
      lastUpdated: response.last_update_time,
      vehicleId: vehicleId,
      startTime: response.started_at,
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
        lastStopName={this.lastStopName()}
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
          type="Trip"
        />
        <Header>Additional trip details</Header>
        <TripData dataKey="Trip ID" value={this.tripId()} code={true}/>
        <TripData dataKey="Vehicle ID" value={this.state.vehicleId} code={true}/>
        <TripData dataKey="Start time" value={timestampToDateTime(this.state.startTime)} />
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
