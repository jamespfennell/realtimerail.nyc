import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios'
import AnimateHeight from 'react-animate-height'

import RouteLogo from '../routelogo/RouteLogo'
import './RoutePage.css'
import LoadingBar from '../loadingbar/LoadingBar'
import _ from 'lodash'


class ServiceMap extends React.Component {
  render() {
    let elements = [];
    for (const stop of this.props.stops) {
      elements.push(
        <div key={stop.id}>{stop.name}</div>
      )
    }
    return (
      <div>{elements}</div>
    )
  }
}


function timestampToDateString(timestamp) {
  let date = new Date(timestamp*1000);
let month =  date.toLocaleString('default', { month: 'long' });
return (
  month + " " +
    date.getDate() + " " +
    date.getFullYear()
)
}
function timestampToTime(timestamp) {
  let date = new Date(timestamp*1000);
let hours = date.getHours();
let minutes = ("0" + date.getMinutes()).substr(-2);
return (
  hours + ":" + minutes
)
}


function replaceRouteIdsWithImages(message)
{
  // Replace route markers of the form [L] in a service message with the relevant image.
	// The function works recursively. It finds the first occurrence of [<route_id>]. What comes before is left intact,
	// the [<route_id>] string is replaced by an image, and the remainder of the message is processed by the same function
	// to see if there another [<route_id>] string.
	let a = message.indexOf('[');
	let b = message.indexOf(']', a);
	if (a<0 || b<0) {
		return message
	}
	let pre = message.substring(0,a);
	let route_id = message.substring(a+1,b);
	let post =replaceRouteIdsWithImages(message.substring(b+1));
	let answer = [
	  <span key={post.length-1}>{pre}</span>,
    <RouteLogo route={route_id.toUpperCase()} key={post.length}/>
  ];
  answer.push(post);
	return answer;

}

function Alerts(props) {
  let alertElements = [];
  for (const alert of props.alerts) {



    let timeMessage = "";
    if (alert.end_time != null) {
      timeMessage += "In effect from " + timestampToDateString(alert.start_time) + " to "
      + timestampToDateString(alert.end_time)
    } else {
      timeMessage += "Alert posted " + timestampToTime(alert.start_time) + ", " + timestampToDateString(alert.creation_time)
    }
    timeMessage += ".";


    alertElements.push(
      <div key={alert.id} className="Alert">
        <div className="header">{alert.header}</div>
        <div className="description">{replaceRouteIdsWithImages(alert.description)}</div>
        <div className="timeMessage">{timeMessage}</div>
      </div>
    )
  }

  return (
    <div className="Alerts">
      {alertElements}
    </div>
  );
}


function StatusSummaryHeader(props) {
  let statusToColorClass = {
    "PLANNED_SERVICE_CHANGE": "Orange",
    "UNPLANNED_SERVICE_CHANGE": "Orange",
    "DELAYS": "Red",
    "GOOD_SERVICE": "Green",
    "NO_SERVICE": "White"
  };
  let statusToText = {
    "PLANNED_SERVICE_CHANGE": "Planned Work",
    "UNPLANNED_SERVICE_CHANGE": "Service Change",
    "DELAYS": "Delays",
    "GOOD_SERVICE": "Good Service",
    "NO_SERVICE": "No Service"
  };
  return (
    <div className={"StatusSummaryHeader " + _.get(statusToColorClass, props.status, "GOOD_SERVICE")}>
      {_.get(statusToText, props.status, "Good Service")}
    </div>
  );
}

function StatusSummaryMessage(props) {

  let messageText = "";
  if (props.numberOfAlerts > 0) {
    messageText = "View " + props.numberOfAlerts + " service alert";
    if (props.numberOfAlerts > 1) {
      messageText += "s";
    }
  } else if (props.status === "GOOD_SERVICE") {
    messageText = "Trains running about every " + Math.round(props.periodicity) + " minutes"
  } else if (props.status === "NO_SERVICE") {
    messageText = "Find alternative trains below"
  }

  let arrow = <div />;
  if (props.canToggleAlerts) {
    if (props.alertsVisible) {
      arrow = <div className="arrow arrowUp"/>
    } else {
      arrow = <div className="arrow arrowDown"/>
    }
  }

  return (
    <div className="StatusSummaryMessage">
      {arrow}
      <div className="message">{messageText}</div>
    </div>
  )
}


class StatusPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertsVisible: false
    };
  }

  canToggleAlerts = () => {
    return (this.props.alerts.length > 0);
  };

  toggleAlerts = (event) => {
    if (!this.canToggleAlerts()) {
      return;
    }
    this.setState({
      alertsVisible: !this.state.alertsVisible
    });
  };

  render() {
    let statusSummaryClasses = "StatusSummary noTextSelect";
    if (this.canToggleAlerts()) {
      statusSummaryClasses += " pointer"
    }

    let height = this.state.alertsVisible ? 'auto' : 0;

    return (
      <div>
        <div onClick={this.toggleAlerts} className={statusSummaryClasses}>
          <StatusSummaryHeader status={this.props.status}/>
          <StatusSummaryMessage
            canToggleAlerts={this.canToggleAlerts()}
            status={this.props.status}
            periodicity={this.props.periodicity}
            numberOfAlerts={this.props.alerts.length}
            alertsVisible={this.state.alertsVisible}
          />
        </div>
        <AnimateHeight
          animateOpacity={true}
          duration={400}
          height={height}>
        <Alerts
          alerts={this.props.alerts}
          alertsVisible={this.state.alertsVisible}
        /></AnimateHeight>
      </div>
    )
  }
}


class RoutePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageStatus: "LOADING",
      routeStatus: "",
      alerts: [],
      stops: [],
      periodicity: null
    };
  }


  render() {
    if (this.state.pageStatus === "LOADING") {

      return (
        <div className="RoutePage">
          <RouteLogo route={this.props.routeId}/>
          <LoadingBar/>
        </div>
      );
    }
    // <ServiceMap stops={this.state.stops} />
    return (
      <div className="RoutePage">
        <RouteLogo route={this.props.routeId}/>
        <StatusPanel status={this.state.routeStatus} alerts={this.state.alerts} periodicity={this.state.periodicity} />
      </div>
    );
  }

  componentDidMount() {
    // TODO: extract the Transiter API calls?
    // Maybe something that can return generic 'no internet' messages?
    // TODO: what about failures?
    // TODO: what about a timer?
    axios.get("https://www.realtimerail.nyc/transiter/v1/systems/nycsubway/routes/" + this.props.routeId).then(
      response => this.loadStatuses(response.data)
    )
  }

  loadStatuses(response) {
    // for (const route of response) {
    //  routeIdToStatus[route.id] = route.status
    //}
    let stops = [];
    for (const serviceMap of response.service_maps) {
      if (serviceMap.group_id !== "any_time") {
        continue;
      }
      stops = serviceMap.stops
    }

    this.setState({
      pageStatus: "LOADED",
      routeStatus: response.status,
      alerts: response.alerts,
      stops: stops,
      periodicity: response.periodicity
    })
  }
}


RoutePage.propTypes = {
  routeId: PropTypes.string
};

export default RoutePage;
