import React from "react";
import './ServiceMap.css'


export function StopData(id, name, time, isActive) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.isActive = isActive;
}

export function EnRouteData() {

}



function ServiceMapStop(props) {
  let stopClasses = "stop";
  if (props.isStartingTerminus) {
    stopClasses += " startingTerminus"
  } else if (props.isEndingTerminus) {
    stopClasses += " endingTerminus"
  } else {
    stopClasses += " regular"
  }
  if (!props.isActive) {
    stopClasses += " inActive"
  }
  if (props.evenStop) {
    stopClasses += " evenStop"
  }
  return (
    <div className={stopClasses}>
      <div className="time">{props.time}</div>
      <div className="marker">
        <div className="line" style={{backgroundColor: props.color}}/>
        <div className="point" />
      </div>
      <div className="name">
        {props.name}</div>
    </div>
  )
}

// <div className="point" style={{borderColor: props.color}} />


class ServiceMap extends React.Component {
  render() {
    let stopElements = [];
    let position=0;
    for (const stop of this.props.stops) {
      if (typeof stop === "EnRouteData") {
        continue;
      }
      stopElements.push(
        <ServiceMapStop
          color={this.props.color}
          key={stop.id}
          name={stop.name}
          time={this.props.showTimes ? stop.time : ""}
          isActive={stop.isActive}
          isStartingTerminus={position === 0}
          isEndingTerminus={position === this.props.stops.length - 1}
          evenStop={position % 2 === 0}
        />
      );
      position += 1;
    }
    return (
      <div className={"ServiceMap " + (this.props.showTimes ? "withTimes" : "noTimes")}>{stopElements}</div>
    )
  }
}


export default ServiceMap