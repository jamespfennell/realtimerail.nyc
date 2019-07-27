import React from 'react';
// import HomePage from './home/HomePage.js'
// import LoadingBar from './shared/loadingbar/LoadingBar.js'
import './App.css';
import StopPage from "./pages/stop/StopPage";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RoutePage from "./pages/route/RoutePage";
import TripPage from "./pages/trip/TripPage";

function App() {
  // <HomePage/>
  // <RoutePage routeId="A" />
  //<RoutePage routeId="Z" />
  // <RoutePage routeId="G" />
  // <TripPage tripId="095950_A..S" routeId="A" lastStopName="Ozone Park - Lefferts Blvd" />
  return (
    <Router>
    <div className="App">
      <div className="header">
        <Link to="/">
          <div className="home">
            realtimerail.nyc
          </div>
        </Link>
      </div>
      <div className="container">




        <Route exact path="/" component={HomePage} />
        <Route exact path="/routes/:routeId" component={RoutePage} />
        <Route exact path="/routes/:routeId/:tripId" component={TripPage} />
        <Route exact path="/stops/:stopId" component={StopPage} />
      </div>
      <div className="footer">
        <p>
          realtimerail.nyc is
          a <a href="https://github.com/jamespfennell/react-sandbox">Javascript/React app</a> that
          uses the <a href="https://github.com/jamespfennell/transiter">open source software Transiter</a> to
          access New York City Transit's realtime data.
        </p>
        <p>
          All subway symbols are trademarked
          and are used pursuant to a license from the <a href="http://www.mta.info">MTA</a>.
        </p>
      </div>
    </div>
    </Router>
  );
}

export default App;
