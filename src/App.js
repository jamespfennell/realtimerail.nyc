import React from 'react';
// import HomePage from './home/HomePage.js'
import RoutePage from './route/RoutePage.js'
import LoadingBar from './loadingbar/LoadingBar.js'
import './App.css';
import HomePage from "./home/HomePage";

function App() {
  // <HomePage/>
  // <RoutePage routeId="A" />
  //<RoutePage routeId="A" />
  //<RoutePage routeId="Z" />
   // <RoutePage routeId="G" />
  return (<div>
          <div className="App">
            <RoutePage routeId="3" />
          </div>
      <div style={{textAlign: "center", color: "white" }}>realtimerail.nyc is a ract base</div>
    </div>
  );
}

export default App;
