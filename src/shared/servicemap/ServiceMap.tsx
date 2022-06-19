import './ServiceMap.css'

import {Link} from "react-router-dom";

import {List, ListElement} from "../../util/List"

export type StopData = {
  id: string,
  name: string,
  time: string,
  isActive: boolean,
}

function IntermediateEnRouteElement(props: {name: string, color: string}) {
  return (
    <ListElement className="regular intermediateEnRoute">
      <div className="time"></div>
      <div className="map">
        <div className="line" style={{backgroundColor: props.color}}/>
        <div className="arrow" style={{borderTopColor: props.color}}/>
      </div>
      <div className="name">
        En route to {props.name}
      </div>
    </ListElement>
  )
}

export type ServiceMapStopProps = {
  stopId: string,
  name: string,
  isStartingTerminus: boolean,
  isEndingTerminus: boolean,
  isActive: boolean,
  type: string,
  color: string,
  time: string,
}

function ServiceMapStop(props: ServiceMapStopProps) {
  let stopClasses = "";
  if (props.isStartingTerminus) {
    stopClasses += " startingTerminus"
  } else if (props.isEndingTerminus) {
    stopClasses += " endingTerminus"
  } else {
    stopClasses += " regular"
  }
  if (!props.isActive && props.type === "Route") {
    stopClasses += " inActive"
  }
  if (!props.isActive && props.type === "Trip") {
    stopClasses += " past"
  }
  return (
    <Link to={"/stops/" + props.stopId} state ={{stopName: props.name}}>
      <ListElement className={stopClasses}>
        <div className="time">{props.time}</div>
        <div className="map">
          <div className="line" style={{backgroundColor: props.color}}/>
          <div className="point"/>
        </div>
        <div className="name">
          {props.name}</div>
      </ListElement>
    </Link>
  )
}

export type ServiceMapProps = {
  type: string,
  color: string,
  showTimes: boolean,
  stops: StopData[],
}

export default function ServiceMap(props: ServiceMapProps) {
    let stopElements = [];
    let position = 0;
    let future = false;
    let firstStop = true;
    for (const stop of props.stops) {
      if (!future && stop.isActive && props.type === "Trip") {
        future = true;
        if (!firstStop) {
          stopElements.push(
            <IntermediateEnRouteElement
              key="nextStop"
              color={props.color}
              name={stop.name}
            />
          )
        }
      }
      firstStop = false;
      stopElements.push(
        <ServiceMapStop
          color={props.color}
          key={stop.id}
          stopId={stop.id}
          name={stop.name}
          time={props.showTimes ? stop.time : ""}
          isActive={stop.isActive}
          isStartingTerminus={position === 0}
          isEndingTerminus={position === props.stops.length - 1}
          type={props.type}
        />
      );
      position += 1;
    }
    return (
      <List className={"ServiceMap " + (props.showTimes ? "withTimes" : "noTimes")}>
        {stopElements}
      </List>
    )
}
