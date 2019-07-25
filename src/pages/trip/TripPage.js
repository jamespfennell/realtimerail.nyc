import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios'
import RouteLogo from '../../shared/routelogo/RouteLogo'

import {timestampToTime, timestampToDateString} from '../../util/Time'
import ServiceMap, {EnRouteData, StopData} from '../../shared/servicemap/ServiceMap'
import {Header} from '../../util/Header'
import './TripPage.css'
import HomePage from "../home/HomePage";
import LazyLoadingPage from "../LazyLoadingPage";


function TripPageHeader(props) {
  let firstStopName = props.firstStopName;
  if (props.firstStopName === undefined || props.firstStopName === null) {
    firstStopName = props.routeId + " Train"
  }
  return (
    <div className="TripPageHeader">
      <div className="routeLogo">
        <RouteLogo route={props.routeId}/>
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

class TripPageOld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStatus: "LOADING",
      errorMessage: "",
      stops: null,
      vehicleId: null,
      lastStop: null
    };
  }

  getFirstStopName() {
    if (this.state.stops == null) {
      return null;
    }
    return this.state.stops[0].name;
  }

  getLastStopName() {
    if (this.state.stops == null) {
      return this.props.lastStopName
    }
    return this.state.stops[this.state.stops.length - 1].name;
  }

  render() {
    if (this.state.pageStatus === "LOADING") {

      return (
        <div className="TripPage">
          <TripPageHeader routeId={this.props.routeId} lastStopName={this.props.lastStopName}/>
        </div>
      );
    } else if (this.state.pageStatus === "ERROR") {
      return (
        <div className="TripPage">
          <TripPageHeader routeId={this.props.routeId} lastStopName={this.props.lastStopName}/>
          {this.state.errorMessage}
        </div>
      );
    }
    // <ServiceMap stops={this.state.stops} />
    return (
      <div className="TripPage">
        <TripPageHeader
          routeId={this.props.routeId}
          lastStopName={this.getLastStopName()}
          firstStopName={this.getFirstStopName()}
        />
        <TripData
          dataKey="Last updated"
          value={timestampToTime(this.state.lastUpdated) + ", " + timestampToDateString(this.state.lastUpdated)}
        />
        <TripData dataKey="Next stop" value={this.state.nextStop.name}/>
        <ServiceMap
          stops={this.state.stops}
          color={this.state.color}
          showTimes={true}
        />
        <Header>Additional trip details</Header>
        <TripData dataKey="Trip ID" value={this.props.tripId} code={true}/>
        <TripData dataKey="Vehicle ID" value={this.state.vehicleId} code={true}/>
        <TripData dataKey="Start time"
                  value={timestampToTime(this.state.startTime) + ", " + timestampToDateString(this.state.startTime)}/>
      </div>
    );
  }

  componentDidMount() {
    // TODO: extract the Transiter API calls?
    // Maybe something that can return generic 'no internet' messages?
    // TODO: what about failures?
    // TODO: what about a timer?
    axios.get(
      "https://www.realtimerail.nyc/transiter/v1/systems/nycsubway/routes/" +
      this.props.routeId + "/trips/" + this.props.tripId).then(
      response => this.loadTrip(response.data)
    ).catch(
      error => this.handleError(error)
    )
  }

  handleError(error) {
    let errorMessage = "";
    if (error.response) {
      errorMessage = "This trip could not be found"
    } else {
      errorMessage = "Not connected to the internet"
    }
    this.setState({
      pageStatus: "ERROR",
      errorMessage: errorMessage
    });
  }

  loadTrip(response) {
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
        tripStopTime.stop.id,
        tripStopTime.stop.name,
        timestampToTime(time),
        true
      );
      if (tripStopTime.future === true && future === false) {
        let enRouteData = new EnRouteData();
        stops.push(enRouteData);
        nextStop = stop;
        future = true;
      }
      stops.push(stop);
    }


    this.setState({
      pageStatus: "LOADED",
      stops: stops,
      color: response.route.color,
      lastUpdated: response.last_update_time,
      vehicleId: response.vehicle_id,
      startTime: response.start_time,
      nextStop: nextStop
    })
  }
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

  transiterUrl() {
    return (
      "https://www.realtimerail.nyc/transiter/v1/systems/nycsubway/routes/" +
      this.props.routeId +
      "/trips/" +
      this.props.tripId
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
        tripStopTime.stop.id,
        tripStopTime.stop.name,
        timestampToTime(time),
        true
      );
      if (tripStopTime.future === true && future === false) {
        let enRouteData = new EnRouteData();
        // THIS SHOULD be handled by the service map
        // stops.push(enRouteData);
        nextStop = stop;
        future = true;
      }
      stops.push(stop);
    }


    return {
      stops: stops,
      color: response.route.color,
      lastUpdated: response.last_update_time,
      vehicleId: response.vehicle_id,
      startTime: response.start_time,
      nextStop: nextStop
    }
  }

  header() {
    return (
      <TripPageHeader
        routeId={this.props.routeId}
        firstStopName={
          this.state.stops == null
            ? null
            : this.state.stops[0].name}
        lastStopName={
          this.state.stops == null
            ? this.props.lastStopName
            : this.state.stops[this.state.stops.length - 1].name}
      />
    )
  }

  body() {
    return (
      <div>
        <TripData
          dataKey="Last updated"
          value={timestampToTime(this.state.lastUpdated) + ", " + timestampToDateString(this.state.lastUpdated)}
        />
        <TripData dataKey="Next stop" value={this.state.nextStop.name}/>
        <ServiceMap
          stops={this.state.stops}
          color={this.state.color}
          showTimes={true}
        />
        <Header>Additional trip details</Header>
        <TripData dataKey="Trip ID" value={this.props.tripId} code={true}/>
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
