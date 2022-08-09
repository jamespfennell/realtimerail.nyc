import './App.css';

import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import StopPage from "./pages/stop/StopPage";
import RoutePage from "./pages/route/RoutePage";
import TripPage from "./pages/trip/TripPage";

import HomeIcon from './util/home.svg'

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="appHeader">
          <Link to="/">
            <div className="home">
              <div className="text">realtimerail.nyc</div>
              <img alt="home" src={HomeIcon} />
            </div>
          </Link>
        </div>
        <div className="container">
          <div className="innerContainer">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/routes/:routeId" element={<RoutePageElement />} />
              <Route path="/routes/:routeId/:tripId" element={<TripPageElement />} />
              <Route path="/stops/:stopId" element={<StopPageElement />} />
            </Routes>
          </div>
        </div>
        <div className="footer">
          <p>
            realtimerail.nyc is
            an <a href="https://github.com/jamespfennell/realtimerail.nyc-react">open source Typescript/React app</a> that
            uses the <a href="https://github.com/jamespfennell/transiter">backend software Transiter</a> to
            access New York City Transit's realtime data.
          </p>
          <p>
            No cookies, no tracking, no ads.
          </p>
          <p>
            All subway symbols are trademarked
            and are used pursuant to a license from the <a href="http://www.mta.info">MTA</a>.
          </p>
        </div>
      </div>
    </BrowserRouter>
  );
}

function RoutePageElement() {
  const params = useParams();
  return <RoutePage
    routeId={params.routeId!}
  />
}

function StopPageElement() {
  const params = useParams();
  const location = useLocation();
  const state = location.state as {stopName: string};
  return <StopPage
    stopId={params.stopId!}
    stopName={state.stopName}
    key={params.stopId}
  />
}

function TripPageElement() {
  const params = useParams();
  const location = useLocation();
  const state = location.state as {lastStopName: string};
  return <TripPage
    routeId={params.routeId!}
    tripId={params.tripId!}
    lastStopName={state.lastStopName}
  />
}
