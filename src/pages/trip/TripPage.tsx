import './TripPage.css'

import RouteLogo from '../../shared/routelogo/RouteLogo'
import { timestampToDateTime, timestampToTime, timestampToTimeElapsed } from '../../util/Time'
import ServiceMap, { StopData } from '../../shared/servicemap/ServiceMap'
import { Link } from 'react-router-dom'
import { Trip } from "../../api/types";
import withHttpData from "../http";
import BasicPage from "../../shared/basicpage/BasicPage";
import { tripURL } from "../../api/api";


function TripPage(props: any) {
  let routeId = props.routeId;
  if (props.match?.params?.routeId != null) {
    routeId = props.match.params.routeId;
  }
  let tripId = props.tripId;
  if (props.match?.params?.tripId != null) {
    tripId = props.match.params.tripId;
  }
  return (
    <div className="RoutePage">
      <BasicPageForTrip
        httpUrl={tripURL(routeId, tripId)}
        httpPollInternal={null}
        routeId={routeId}
        header={Header}
        body={Body} />
    </div>
  )
}

let BasicPageForTrip = withHttpData(BasicPage, Trip.fromJSON)

/* TODO
transiterErrorMessage(response: any) {
  if (response.status === 404) {
    return "this trip no longer exists"
  }
  return "error retrieving data"
}
*/

function Header(props: any) {
  // TODO: extract all this props vs props.match tedium
  let routeId = props.routeId;
  if (props.match?.params?.routeId != null) {
    routeId = props.match.params.routeId;
  }
  let trip = props.httpData.response;
  let lastStopName = props.lastStopName
  if (props.location != null && props.location.state != null) {
    lastStopName = props.location.state.lastStopName
  }
  if (trip !== null && trip !== undefined) {
    lastStopName = trip.stopTimes[trip.stopTimes.length - 1].stop?.name
  }

  let firstStopName = trip?.stopTimes[0] == null
      ? undefined
      : trip?.stopTimes[0].stop?.name;
  if (firstStopName === undefined || firstStopName === null) {
    firstStopName = routeId + " Train"
  }
  return (
    <div className="TripPageHeader">
      <div className="routeLogo">
        <Link to={"/routes/" + props.routeId}>
          <RouteLogo route={props.routeId} />
        </Link>
      </div>
      <div className="details">
        <div className="big">{firstStopName}</div>
        <div className="small">to</div>
        <div className="big">{lastStopName}</div>
      </div>
    </div>
  )
}

function Body(trip: Trip) {

  let nextStopName = "";
  let future = false;
  let stops = [];
  for (const tripStopTime of trip.stopTimes) {
    if (tripStopTime.stop === null) {
      continue
    }
    let time = tripStopTime.arrival?.time;
    if (time == null) {
      time = tripStopTime.departure?.time;
    }
    let stop = new StopData(
      tripStopTime.stop?.id.substr(0, tripStopTime.stop.id.length - 1),
      tripStopTime.stop?.name,
      timestampToTime(time),
      tripStopTime.future
    );
    if (tripStopTime.future === true && future === false) {
      future = true;
      if (tripStopTime.stop?.name !== undefined) {
        nextStopName = tripStopTime.stop?.name;
      }
    }
    stops.push(stop);
  }

  let vehicleId = ""
  if (trip.vehicle != null) {
    vehicleId = trip.vehicle.id
  }

  /*
  TODO
    <TripData
        dataKey="Last updated"
        value={timestampToTimeElapsed(response.lastUpdated)}
        code={false}
      />
  */

  return (
    <div>
      <TripData dataKey="Next stop" value={nextStopName} code={false} />
      <ServiceMap
        stops={stops}
        color={"#" + trip.route?.color}
        showTimes={true}
        type="Trip"
      />
      <div className="SubHeading">Additional trip details</div>
      <TripData dataKey="Trip ID" value={trip.id} code={true} />
      <TripData dataKey="Vehicle ID" value={vehicleId} code={true} />
      <TripData dataKey="Start time" value={timestampToDateTime(trip.startedAt)} code={false} />
    </div>
  )
}

type TripDataProps = {
  dataKey: string,
  value: string,
  code: boolean,
}

function TripData(props: TripDataProps) {
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

export default TripPage;
