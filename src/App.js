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
  return (<div>
          <div className="App">
            <StopPage stopId="M11" name="Union Sq" />
          </div>
      <div style={{textAlign: "center", color: "white" }}>realtimerail.nyc is a ract base</div>
    </div>
  );
}

export default App;
