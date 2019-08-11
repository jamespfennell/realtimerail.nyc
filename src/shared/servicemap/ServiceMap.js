import React from "react";
import './ServiceMap.css'
import {Link} from "react-router-dom";
import {List, ListElement} from "../../util/List"


export function StopData(id, name, time, isActive) {
  this.id = id;
  this.name = name;
  this.time = time;
  this.isActive = isActive;
}

function IntermediateEnRouteElement(props) {
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

function ServiceMapStop(props) {
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
    <Link to={{pathname: "/stops/" + props.stopId, state: {stopName: props.name}}}>
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

// <div className="point" style={{borderColor: props.color}} />


class ServiceMap extends React.Component {
  render() {
    let stopElements = [];
    let position = 0;
    let future = false;
    let firstStop = true;
    for (const stop of this.props.stops) {
      if (!future && stop.isActive && this.props.type === "Trip") {
        future = true;
        if (!firstStop) {
          stopElements.push(
            <IntermediateEnRouteElement
              key="nextStop"
              color={this.props.color}
              name={stop.name}
            />
          )
        }
      }
      firstStop = false;
      stopElements.push(
        <ServiceMapStop
          color={this.props.color}
          key={stop.id}
          stopId={stop.id}
          name={stop.name}
          time={this.props.showTimes ? stop.time : ""}
          isActive={stop.isActive}
          isStartingTerminus={position === 0}
          isEndingTerminus={position === this.props.stops.length - 1}
          type={this.props.type}
        />
      );
      position += 1;
    }
    return (
      <List className={"ServiceMap " + (this.props.showTimes ? "withTimes" : "noTimes")}>
        {stopElements}
      </List>
    )
  }
}


export default ServiceMap