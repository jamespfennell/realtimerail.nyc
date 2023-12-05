import React, { useState } from "react";

import './StopPage.css'

import ListOfRouteLogos from "../../shared/routelogo/ListOfRouteLogos";
import RouteLogo from "../../shared/routelogo/RouteLogo";
import { Link } from "react-router-dom";
import { List, ListElement } from "../../util/List";
import { ListStopsReply, Stop, StopTime, Stop_Reference, Trip_Reference } from "../../api/types";
import { HttpData, useHttpData } from "../http";
import { stopServiceMapsURL, stopURL } from "../../api/api";
import BasicPage from "../../shared/basicpage/BasicPage";
import { FavoriteButton } from "../../shared/favorites/FavoriteButton";


export type StopPageProps = {
  stopId: string;
  stopName: string | null;
}

function StopPage(props: StopPageProps) {
  const httpData = useHttpData(stopURL(props.stopId), 5000, Stop.fromJSON);
  return (
    <div className="StopPage" key={props.stopId}>
      <BasicPage
        httpData={httpData}
        header={Header}
        body={Body}
        stopName={props.stopName}
        stopId={props.stopId}
      />
    </div>
  )
}

export type HeaderProps = {
  httpData: HttpData<Stop>;
  stopName: string | null;
  stopId: string;
}

function Header(props: HeaderProps) {
  let stopName = props.stopName;
  if (props.httpData.response?.name !== undefined) {
    stopName = props.httpData.response?.name
  }
  return <div className="header">
    {stopName}
    <FavoriteButton stopId={props.stopId} />
  </div>
}

function Body(stop: Stop) {
  let headsignToStopTimes = new Map();
  for (const headsignRule of stop.headsignRules) {
    headsignToStopTimes.set(headsignRule.headsign, [])
  }
  for (const stopTime of stop.stopTimes) {
    let headsign = stopTime.headsign ?? "(terminating trains)"
    if (!headsignToStopTimes.has(headsign)) {
      headsignToStopTimes.set(headsign, [])
    }
    headsignToStopTimes.get(headsign).push(stopTime)
  }

  let headsigns = [];
  for (const [headsign] of headsignToStopTimes) {
    headsigns.push(headsign);
  }
  headsigns.sort();

  let usualRouteIds: string[] = [];
  for (const serviceMap of stop.serviceMaps) {
    if (serviceMap.configId === 'weekday') {
      serviceMap.routes.forEach(
        route => usualRouteIds.push(route.id)
      )
    }
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
  for (const headsign of headsigns) {
    stopTimeElements.push(
      <HeadsignStopTimes key={headsign} headsign={headsign} stopTimes={headsignToStopTimes.get(headsign) ?? []} currentTime={currentTime} />
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
      <LinkedStops stops={inSystemTransfers} title="Transfers" key="transfers" />
    </div>
  )
}
type HeadsignStopTimesProps = {
  headsign: string;
  stopTimes: StopTime[];
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
      skipped += 1;
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
    let trip: Trip_Reference = stopTime.trip;

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
        lastStopName={trip.destination?.name ?? ""}
        routeId={trip.route?.id ?? ""}
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
      <div key="moreTrips" className="MoreTrips" onClick={() => setMaxStopTimes(maxStopTimes + 4)}>
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
        <ListOfRouteLogos routeIds={props.routeIds} skipExpress={true} addLinks={false} />
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
    displayTime = "Now"
  } else if (props.time < 60) {
    displayTime = "<1m"
  } else {
    displayTime = Math.floor(props.time / 60).toString() + "m"
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

type LinkedStopsProps = {
  stops: Stop_Reference[],
  title: string,
}

function LinkedStops(props: LinkedStopsProps) {
  let stopIDs = [];
  for (const stop of props.stops) {
    stopIDs.push(stop.id);
  }
  const httpData = useHttpData(stopServiceMapsURL(stopIDs), null, ListStopsReply.fromJSON);
  if (stopIDs.length === 0) {
    return <div></div>
  }
  let stopIDToRoutes = new Map();
  if (httpData.response !== null) {
    for (const stop of httpData.response.stops) {
      let routeIds = [];
      for (const serviceMap of stop.serviceMaps) {
        if (serviceMap.configId !== "weekday") {
          continue
        }
        for (const route of serviceMap.routes) {
          routeIds.push(route.id)
        }
      }
      stopIDToRoutes.set(stop.id, routeIds)
    }
  }
  let elements = [];
  for (const stop of props.stops) {
    let routeIds = stopIDToRoutes.get(stop.id) ?? [];
    elements.push(
      <SiblingStop
        key={"siblingStop" + stop.id}
        stopId={stop.id}
        name={stop.name ?? ""}
        routeIds={routeIds}
      />
    )
  }
  return (
    <div>
      <div className="SubHeading" key="header">{props.title}</div>
      <List className="siblingStops">
        {elements}
      </List>
    </div>
  )
}

export default StopPage;
