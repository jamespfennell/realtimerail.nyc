import React from 'react';
// import HomePage from './home/HomePage.js'
// import LoadingBar from './shared/loadingbar/LoadingBar.js'
import './App.css';
import StopPage from "./pages/stop/StopPage";

function App() {
  // <HomePage/>
  // <RoutePage routeId="A" />
  //<RoutePage routeId="Z" />
  // <RoutePage routeId="G" />
  // <TripPage tripId="095950_A..S" routeId="A" lastStopName="Ozone Park - Lefferts Blvd" />
  return (
    <div className="App">
      <div className="container">
        <StopPage stopId="A27" name="14 St - Union Sq"/>
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
  );
}

export default App;
