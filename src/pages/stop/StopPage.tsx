import React, { useState } from "react";

import './StopPage.css'

import ListOfRouteLogos from "../../shared/routelogo/ListOfRouteLogos";
import RouteLogo from "../../shared/routelogo/RouteLogo";
import { Link } from "react-router-dom";
import { List, ListElement } from "../../util/List";
import { RelatedStop, Stop, Stop_StopTime, TripPreview } from "../../api/types";
import withHttpData, { HttpData } from "../http";
import { stopURL } from "../../api/api";
import BasicPage from "../../shared/basicpage/BasicPage";


export type StopPageProps = {
  stopId: string;
  stopName: string | null;
}

function StopPage(props: StopPageProps) {
  return (
    <div className="StopPage" key={props.stopId}>
      <BasicPageForStop
        httpUrl={stopURL(props.stopId)}
        httpPollInterval={5000}
        header={Header}
        body={Body}
        stopName={props.stopName}
      />
    </div>
  )
}

let BasicPageForStop = withHttpData(BasicPage, Stop.fromJSON)

export type HeaderProps = {
  httpData: HttpData<Stop>;
  stopName: string | null;
}

function Header(props: HeaderProps) {
  let stopName = props.stopName;
  if (props.httpData.response?.name !== undefined) {
    stopName = props.httpData.response?.name
  }
  return <div className="header">
    {stopName}
  </div>
}

function Body(stop: Stop) {
  let headsignToStopTimes = new Map();
  for (const headsign of stop.stopHeadsigns) {
    headsignToStopTimes.set(headsign, [])
  }
  for (let stopTime of stop.stopTimes) {
    if (stopTime.headsign === undefined) {
      stopTime.headsign = "(terminating trains)"
    }
    if (!headsignToStopTimes.has(stopTime.headsign)) {
      headsignToStopTimes.set(stopTime.headsign, [])
    }
    headsignToStopTimes.get(stopTime.headsign).push(stopTime)
  }

  let usualRouteIds: string[] = [];
  for (const serviceMap of stop.serviceMaps) {
    // TODO: weekday
    if (serviceMap.configId === 'alltimes') {
      serviceMap.routes.forEach(
        route => usualRouteIds.push(route.id)
      )
    }
  }

  let siblingStops: RelatedStop[] = [];
  if (stop.parentStop != null) {
    siblingStops = stop.parentStop.childStops;
  }
  let inSystemTransfers = [];
  let otherSystemTransfers = [];
  for (const transfer of stop.transfers) {
    // TODO: handle cross-system transfers
    if (transfer.toStop != null) {
      inSystemTransfers.push(transfer.toStop)
    } else {
      otherSystemTransfers.push(transfer.toStop);
    }
  }

  let currentTime = Math.round((new Date()).getTime() / 1000);

  let stopTimeElements = [];
  let allAssigned = true; // TODO
  // TODO: iterate alphabetically?
  for (const [headsign, stopTimes] of headsignToStopTimes) {
    stopTimeElements.push(
      <HeadsignStopTimes key={headsign} headsign={headsign} stopTimes={stopTimes} currentTime={currentTime} />
    )
  }
  if (!allAssigned) {
    stopTimeElements.push(
      <div key="scheduledTripWarning" className="scheduledTripWarning">
        Trains marked with {String.fromCharCode(9734)} are scheduled and have not entered into service yet.
      </div>
    )
  }

  return (
    <div>
      <div className="mainRoutes">
        <ListOfRouteLogos
          routeIds={usualRouteIds}
          skipExpress={true}
          addLinks={true}
        />
      </div>
      {stopTimeElements}
      {buildLinkedStops(siblingStops, "Other platforms at this station")}
      {buildLinkedStops(inSystemTransfers, "Out of system transfers")}
      {buildConnections(otherSystemTransfers)}
    </div>
  )
}
type HeadsignStopTimesProps = {
  headsign: string;
  stopTimes: Stop_StopTime[];
  currentTime: number;
}

function HeadsignStopTimes(props: HeadsignStopTimesProps) {

  let [maxStopTimes, setMaxStopTimes] = useState(4);

  let children = [];
  children.push(
    <div key="subHeading" className="SubHeading">
      {props.headsign}
    </div>
  );
  let rendered = 0;
  let skipped = 0;
  if (props.stopTimes.length === 0) {
    children.push(
      <div key="noTrainsScheduled" className="noTrainsScheduled">
        No trains scheduled
      </div>
    );
  }
  let tripStopTimeElements = [];
  for (const stopTime of props.stopTimes) {
    let tripTime = stopTime.arrival?.time;
    if (tripTime === undefined) {
      tripTime = stopTime.departure?.time;
    }
    if (tripTime === undefined) {
      skipped += 1;
      continue
    }
    // This handles buggy stale trips in the GTFS feed, as well as trips that have left the station
    // but have not been updated in the feed yet.
    if (tripTime < props.currentTime) {
      continue;
    }
    if (rendered >= maxStopTimes && tripTime - props.currentTime > 10 * 60) {
      break
    }
    if (stopTime.trip === undefined) {
      skipped += 1;
      continue;
    }
    rendered += 1
    let trip: TripPreview = stopTime.trip;

    // TODO
    /*
    let isAssigned = (
      tripStopTime.trip.currentStatus != null ||
      tripStopTime.trip.currentStopSequence !== 0
    );
    allAssigned = allAssigned && isAssigned;*/

    tripStopTimeElements.push(
      <TripStopTime
        key={"trip" + trip.id}
        lastStopName={definedOr(trip.lastStop?.name, "")}
        routeId={definedOr(trip.route?.id, "")}
        tripId={trip.id}
        time={tripTime - props.currentTime}
        isAssigned={true} // TODO
      />
    );
  }
  if (rendered > maxStopTimes) {
    maxStopTimes = rendered
  }
  children.push(
    <List key="tripStopTimes">
      {tripStopTimeElements}
    </List>
  );
  if (rendered + skipped !== props.stopTimes.length) {
    children.push(
      <div className="MoreTrips" onClick={() => setMaxStopTimes(maxStopTimes + 4)}>
        show more trains
      </div>
    )
  }
  return <div>{children}</div>
}

type SiblingStopProps = {
  key: string,
  stopId: string,
  name: string,
  routeIds: string[],
}

function SiblingStop(props: SiblingStopProps) {
  return (
    <Link to={"/stops/" + props.stopId} state={{ stopName: props.name }}>
      <ListElement className="SiblingStop">
        <ListOfRouteLogos routeIds={props.routeIds} skipExpress={true} />
        <div className="name">{props.name}</div>
      </ListElement>
    </Link>
  )
}


type TripStopTimeProps = {
  key: string,
  lastStopName: string,
  routeId: string,
  tripId: string,
  time: any,
  isAssigned: boolean,
}

function TripStopTime(props: TripStopTimeProps) {
  let displayTime = "";
  if (props.time < 30) {
    displayTime = "Arr"
  } else if (props.time < 60) {
    displayTime = String.fromCharCode(189)
  } else {
    displayTime = Math.floor(props.time / 60).toString()
  }

  return (
    <Link
      to={"/routes/" + props.routeId + "/" + props.tripId}
      state={{ lastStopName: props.lastStopName }}>
      <ListElement className={"TripStopTime"}>
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
      </ListElement>
    </Link>
  )
}


function buildLinkedStops(stops: any, title: any) {
  if (stops.length === 0) {
    return null
  }
  let stopIds = new Set();
  let siblingStopElements = [];
  for (const siblingStop of stops) {
    if (stopIds.has(siblingStop.id)) {
      continue
    }
    stopIds.add(siblingStop.id)
    let routeIds = [];
    for (const serviceMap of siblingStop.serviceMaps) {
      if (serviceMap.configId === "weekday_day") {
        for (const route of serviceMap.routes) {
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
  return (
    <div>
      <div className="SubHeading" key="header">{title}</div>
      <List className="siblingStops">
        {siblingStopElements}
      </List>
    </div>
  )
}

function buildConnections(stops: any) {
  if (stops.length === 0) {
    return null
  }
  let stopIds = new Set();
  let elements = []
  for (const siblingStop of stops) {
    if (stopIds.has(siblingStop.id)) {
      continue
    }
    stopIds.add(siblingStop.id)
    elements.push(
      <ListElement key={siblingStop.id}>{siblingStop.system?.name} at {siblingStop.name}</ListElement>
    )
  }
  return (
    <div>
      <div className="SubHeading">Connections</div>
      <List className="siblingStops">{elements}</List>
    </div>
  )
}

function definedOr<S>(s: S | undefined, d: S): S {
  if (s === undefined) {
    return d
  }
  return s
}

export default StopPage;
