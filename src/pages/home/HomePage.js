import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios'
import _ from 'lodash'

import {Link} from "react-router-dom";
import RouteLogo from '../../shared/routelogo/RouteLogo'
import './HomePage.css'
import BASE_URL from "../../shared/BaseUrl";
import {buildStatusFromAlerts} from '../../util/Alert'

class RouteButton extends React.Component {
  render() {
    let statusToColorClass = {
      "SERVICE_CHANGE": "Orange",
      "DELAYS": "Red",
    };
    let status = buildStatusFromAlerts(this.props.alerts)
    let statusClasses = "statusCircle " + _.get(statusToColorClass, status, "");
    let buttonClasses = "cell";
    //if (this.props.status === "NO_SERVICE") {
    //  buttonClasses += " NoService"
    //}

    let descriptionElement = null;
    if (this.props.description !== "") {
      descriptionElement = <div className="description">{this.props.description}</div>
    }

    return (
      <div className={buttonClasses}>
        <Link to={"/routes/" + this.props.route}>
          <div className={statusClasses}/>
          <RouteLogo route={this.props.route}/>
          {descriptionElement}
        </Link>
      </div>
    )
  }
}

RouteButton.propTypes = {
  route: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string
};


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeIdToAlerts: {}
    };
    this.layout = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "G", "L"],
      ["A", "C", "E"],
      ["B", "D", "F", "M"],
      ["N", "Q", "R", "W"],
      ["J", "Z", "SI"],
      ["H", "FS", "GS"]
    ];
    this.routeIdToDescription = {
      "H": "Rockaways shuttle",
      "FS": "Franklin Av shuttle",
      "GS": "42nd street shuttle"
    };
  }

  render() {
    let grid = [];
    for (const routeIds of this.layout) {
      let row = [];
      for (const routeId of routeIds) {
        row.push(
          <RouteButton
            route={routeId}
            key={routeId}
            alerts={_.get(this.state.routeIdToAlerts, routeId, "")}
            description={_.get(this.routeIdToDescription, routeId, "")}
          />
        )
      }
      grid.push(
        <div className="row" key={routeIds}>
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
    axios.get(BASE_URL + "systems/nycsubway/routes?alerts_detail=all").then(
      response => this.loadAlerts(response.data)
    )
  }

  loadAlerts(response) {
    let routeIdToAlerts = {};
    for (const route of response) {
      routeIdToAlerts[route.id] = route.alerts
    }
    this.setState({
      routeIdToAlerts: routeIdToAlerts
    })
  }
}

export default HomePage;
