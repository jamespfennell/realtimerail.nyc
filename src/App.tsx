import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LocationPage from "./pages/LocationPage";
import StopPage from "./pages/StopPage";
import RoutePage from "./pages/RoutePage";
import TripPage from "./pages/TripPage";
import FavoritesPage from "./pages/FavoritesPage";

// TODO: add a public attribution for the icons https://iconoir.com/
import HomeIcon from "./icons/home.svg";
import StarIcon from "./icons/star.svg";
import LocationIcon from "./icons/location.svg";
import DebuggingPage from "./pages/DebuggingPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="appHeader">
          <Link to="/favorites">
            <div className="home">
              <img alt="go to favorite stops" src={StarIcon} />
            </div>
          </Link>
          <Link to="/">
            <div className="home">
              <img alt="go to the home page" src={HomeIcon} />
            </div>
          </Link>
          <Link to="/nearby">
            <div className="home">
              <img alt="find nearby stops" src={LocationIcon} />
            </div>
          </Link>
        </div>
        <div className="container">
          <div className="innerContainer">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/debug" element={<DebuggingPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/nearby" element={<LocationPage />} />
              <Route path="/routes/:routeId" element={<RoutePageElement />} />
              <Route
                path="/routes/:routeId/:tripId"
                element={<TripPageElement />}
              />
              <Route path="/stops/:stopId" element={<StopPageElement />} />
            </Routes>
          </div>
        </div>
        <div className="footer">
          <p>
            realtimerail.nyc is an{" "}
            <a href="https://github.com/jamespfennell/realtimerail.nyc-react">
              open source Typescript/React app
            </a>{" "}
            that uses the{" "}
            <a href="https://github.com/jamespfennell/transiter">
              backend software Transiter
            </a>{" "}
            to access New York City Transit's realtime data.
          </p>
          <p>No cookies, no tracking, no ads.</p>
          <p>
            All subway symbols are trademarked and are used pursuant to a
            license from the <a href="http://www.mta.info">MTA</a>.
          </p>
          <p>
            <Link to="/debug">Debugging information</Link>.
          </p>
        </div>
      </div>
    </BrowserRouter>
  );
}

function RoutePageElement() {
  const params = useParams();
  return <RoutePage routeId={params.routeId!} />;
}

function StopPageElement() {
  const params = useParams();
  const location = useLocation();
  const state = location.state as { stopName: string };
  return (
    <StopPage
      stopId={params.stopId!}
      stopName={state?.stopName}
      key={params.stopId}
    />
  );
}

function TripPageElement() {
  const params = useParams();
  const location = useLocation();
  const state = location.state as { lastStopName: string };
  return (
    <TripPage
      routeId={params.routeId!}
      tripId={params.tripId!}
      lastStopName={state?.lastStopName}
    />
  );
}
