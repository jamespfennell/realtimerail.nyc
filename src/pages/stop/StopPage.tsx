import React from "react";
import PropTypes from 'prop-types';

import './StopPage.css'

import ListOfRouteLogos from "../../shared/routelogo/ListOfRouteLogos";
import RouteLogo from "../../shared/routelogo/RouteLogo";
import { Link } from "react-router-dom";
import { List, ListElement } from "../../util/List";
import { RelatedStop, Stop } from "../../api/types";
import withHttpData from "../http";
import { stopURL } from "../../api/api";
import BasicPage from "../../shared/basicpage/BasicPage";


function StopPage(props: any) {
  let stopId = props.stopId;
  if (props.match != null) {
    stopId = props.match.params.stopId;
  }
  return (
    <div className="StopPage" key={stopId}>
      <BasicPageForStop
        httpUrl={stopURL(stopId)}
        httpPollInterval={5000}
        header={Header}
        body={Body}
      />
    </div>
  )
}

let BasicPageForStop = withHttpData(BasicPage, Stop.fromJSON)

function Header(props: any) {
  let stopName: string | null = null;
  if (props.stopName !== null) {
    stopName = props.stopName
  }
  if (props.httpData.response?.name !== null) {
    stopName = props.httpData.response?.name
  }
  return <div className="header">
    {stopName}
  </div>
}

function Body(stop: Stop) {
  let directionNameToTripStopTimes = new Map();
  for (const directionName of stop.stopHeadsigns) {
    directionNameToTripStopTimes.set(directionName, [])
  }
  for (const tripStopTime of stop.stopTimes) {
    directionNameToTripStopTimes.get(tripStopTime.headsign).push(tripStopTime)
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

  let directionNameElements = [];
  let allAssigned = true;
  for (const [directionName, tripStopTimes] of directionNameToTripStopTimes) {
    let internalElements = [];
    internalElements.push(
      <div className="SubHeading">
        {directionName}
      </div>
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

        let tripTime = tripStopTime.arrival.time;
        if (tripTime == null) {
          tripTime = tripStopTime.departure.time;
        }

        // TODO
        let isAssigned = (
          tripStopTime.trip.currentStatus != null ||
          tripStopTime.trip.currentStopSequence !== 0
        );
        allAssigned = allAssigned && isAssigned;

        tripStopTimeElements.push(
          <TripStopTime
            key={"trip" + tripStopTime.trip.id}
            lastStopName={tripStopTime.trip.lastStop.name}
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

  return (
    <div>
      <div className="mainRoutes">
        <ListOfRouteLogos
          routeIds={usualRouteIds}
          skipExpress={true}
          addLinks={true}
        />
      </div>
      {directionNameElements}
      {buildLinkedStops(siblingStops, "Other platforms at this station")}
      {buildLinkedStops(inSystemTransfers, "Out of system transfers")}
      {buildConnections(otherSystemTransfers)}
    </div>
  )
}


type SiblingStopProps = {
  key: string,
  stopId: string,
  name: string,
  routeIds: string[],
}

function SiblingStop(props: SiblingStopProps) {
  return (
    <Link to={{ pathname: "/stops/" + props.stopId, state: { stopName: props.name } }}>
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
      to={{
        pathname: "/routes/" + props.routeId + "/" + props.tripId,
        state: { lastStopName: props.lastStopName }
      }}>
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

export default StopPage;
