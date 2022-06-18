import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios'
import _ from 'lodash'

import {Link} from "react-router-dom";
import RouteLogo from '../../shared/routelogo/RouteLogo'
import './HomePage.css'
import {buildStatusFromAlerts} from '../../util/Alert'
import { listRoutesURL } from "../../api/api";
import { AlertPreview, ListRoutesInSystemReply } from "../../api/types";


export type RouteButtonProps = {
  route: string;
  alerts: AlertPreview[];
  description: string;
}

function RouteButton(props: RouteButtonProps) {
    let statusToColorClass = {
      "SERVICE_CHANGE": "Orange",
      "DELAYS": "Red",
    };
    let status = buildStatusFromAlerts(props.alerts)
    let statusClasses = "statusCircle " + _.get(statusToColorClass, status, "");
    let buttonClasses = "cell";
    //if (this.props.status === "NO_SERVICE") {
    //  buttonClasses += " NoService"
    //}

    let descriptionElement = null;
    if (props.description !== "") {
      descriptionElement = <div className="description">{props.description}</div>
    }

    return (
      <div className={buttonClasses}>
        <Link to={"/routes/" + props.route}>
          <div className={statusClasses}/>
          <RouteLogo route={props.route}/>
          {descriptionElement}
        </Link>
      </div>
    )
}

RouteButton.propTypes = {
  route: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string
};


/*

export type HomePageProps = {
}

function HomePage(props: {}) {
*/

export type HomePageState = {
  routeIdToAlerts: Map<string, AlertPreview[]>;
}

class HomePage extends React.Component {
  state: HomePageState;

  constructor(props: {}) {
    super(props);
    this.state = {
      routeIdToAlerts: new Map(),
    };

  }

  render() {
    console.log("Rendering")
    console.log(this.state.routeIdToAlerts);
    const layout = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "G", "L"],
      ["A", "C", "E"],
      ["B", "D", "F", "M"],
      ["N", "Q", "R", "W"],
      ["J", "Z", "SI"],
      ["H", "FS", "GS"]
    ];
    const routeIdToDescription = {
      "H": "Rockaways shuttle",
      "FS": "Franklin Av shuttle",
      "GS": "42nd street shuttle"
    };

    let grid = [];
    for (const routeIds of layout) {
      let row = [];
      for (const routeId of routeIds) {
        let alerts: AlertPreview[] = [];
        let alertsOr = this.state.routeIdToAlerts.get(routeId);
        if (alertsOr !== undefined) {
          alerts = alertsOr;
        }
        row.push(
          <RouteButton
            route={routeId}
            key={routeId}
            alerts={alerts}
            description={_.get(routeIdToDescription, routeId, "")}
          />
        )
      }
      grid.push(
        <div className="row" key={_.join(routeIds)}>
          {row}
        </div>
      );
    }
    return (
      <div className="HomePage">
        <div className="routeGrid">
          {grid}
        </div>
      </div>
    );
  }

  componentDidMount() {
    // TODO: extract the Transiter API calls?
    // Maybe something that can return generic 'no internet' messages?
    // TODO: what about failures?
    // TODO: what about a timer?
    axios.get(listRoutesURL()).then(
      response => this.loadAlerts(response.data)
    )
  }

  loadAlerts(response: ListRoutesInSystemReply) {
    let routeIdToAlerts: Map<string, AlertPreview[]> = new Map();
    for (const route of response.routes) {
      routeIdToAlerts.set(route.id,  route.alerts)
    }
    this.setState({
      routeIdToAlerts: routeIdToAlerts
    })
  }
}

export default HomePage;
