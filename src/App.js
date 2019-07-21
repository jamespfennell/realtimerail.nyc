import React from 'react';
// import HomePage from './home/HomePage.js'
import RoutePage from './pages/route/RoutePage.js'
// import LoadingBar from './shared/loadingbar/LoadingBar.js'
import './App.css';
import TripPage from "./pages/trip/TripPage";

function App() {
  // <HomePage/>
  // <RoutePage routeId="A" />
  //<RoutePage routeId="A" />
  //<RoutePage routeId="Z" />
   // <RoutePage routeId="G" />
  // <RoutePage routeId="L" />
  return (<div>
          <div className="App">
            <TripPage tripId="095950_A..S" routeId="A" lastStopName="Ozone Park - Lefferts Blvd" />
          </div>
      <div style={{textAlign: "center", color: "white" }}>realtimerail.nyc is a ract base</div>
    </div>
  );
}

export default App;
