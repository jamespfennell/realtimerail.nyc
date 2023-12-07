import "./TripPage.css";

import RouteLogo from "../../shared/routelogo/RouteLogo";
import { timestampToDateTime, timestampToTime } from "../../util/time";
import ServiceMap, { StopData } from "../../shared/servicemap/ServiceMap";
import { Link } from "react-router-dom";
import { Trip } from "../../api/types";
import { HttpData, useHttpData } from "../http";
import BasicPage from "../../shared/basicpage/BasicPage";
import { tripURL } from "../../api/api";

export type TripPageProps = {
  routeId: string;
  tripId: string;
  lastStopName: string | null;
};

function TripPage(props: TripPageProps) {
  const httpData = useHttpData(
    tripURL(props.routeId, props.tripId),
    5000,
    Trip.fromJSON,
  );
  return (
    <div className="TripPage">
      <Header
        httpData={httpData}
        routeId={props.routeId}
        lastStopName={props.lastStopName}
      />
      <BasicPage httpData={httpData} body={Body} />
    </div>
  );
}

/* TODO
transiterErrorMessage(response: any) {
  if (response.status === 404) {
    return "this trip no longer exists"
  }
  return "error retrieving data"
}
*/

type HeaderProps = {
  routeId: string;
  lastStopName: string | null;
  httpData: HttpData<Trip>;
};

function Header(props: HeaderProps) {
  let routeId = props.routeId;
  let lastStopName = props.lastStopName;
  let trip = props.httpData.response;
  if (trip !== null && trip !== undefined) {
    lastStopName =
      trip.stopTimes[trip.stopTimes.length - 1].stop?.name ?? lastStopName;
  }

  let firstStopName =
    trip?.stopTimes[0] == null ? undefined : trip?.stopTimes[0].stop?.name;
  if (firstStopName === undefined || firstStopName === null) {
    firstStopName = routeId + " Train";
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
  );
}

function Body(trip: Trip) {
  let nextStopName = "";
  let future = false;
  let stops: StopData[] = [];
  for (const tripStopTime of trip.stopTimes) {
    if (tripStopTime.stop === null) {
      continue;
    }
    let time = tripStopTime.arrival?.time;
    if (time == null) {
      time = tripStopTime.departure?.time;
    }
    let stop = {
      id: tripStopTime.stop?.id.substr(0, tripStopTime.stop.id.length - 1)!,
      name: tripStopTime.stop?.name!,
      time: timestampToTime(time),
      isActive: tripStopTime.future,
    };
    if (tripStopTime.future === true && future === false) {
      future = true;
      if (tripStopTime.stop?.name !== undefined) {
        nextStopName = tripStopTime.stop?.name;
      }
    }
    stops.push(stop);
  }

  let vehicleId = "";
  if (trip.vehicle != null) {
    vehicleId = trip.vehicle.id;
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
      <TripData
        dataKey="Start time"
        value={timestampToDateTime(trip.startedAt)}
        code={false}
      />
    </div>
  );
}

type TripDataProps = {
  dataKey: string;
  value: string;
  code: boolean;
};

function TripData(props: TripDataProps) {
  let valueClasses = "value";
  if (props.code === true) {
    valueClasses += " code";
  }
  if (props.value === "") {
    return null;
  }
  return (
    <div className="TripData">
      <div className="dataKey">{props.dataKey}:</div>
      <div className={valueClasses}>{props.value}</div>
    </div>
  );
}

export default TripPage;
