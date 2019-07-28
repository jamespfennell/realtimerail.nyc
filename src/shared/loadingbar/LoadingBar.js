import React from "react";
// import RouteLogo from '../routelogo/RouteLogo'
import './LoadingBar.css'


class LoadingBar extends React.Component {

  render() {
    return (<div className="spinner">
      <div className="bounce1"/>
      <div className="bounce2"/>
      <div className="bounce3"/>
    </div>)
  }

}

export default LoadingBar;
