import React from "react";
import "./FavoritesPage.css";
import { List, ListElement } from "../../util/List";
import { Link } from "react-router-dom";
import { useFavorites } from "../../shared/favorites/hooks/favorites";
import { useHttpData } from "../http";
import { stopURL } from "../../api/api";
import { Stop } from "../../api/types";
import ListOfRouteLogos from "../../shared/routelogo/ListOfRouteLogos";

export type RoutePageProps = {
  routeId: string;
};

export default function FavoritesPage(props: RoutePageProps) {
  const { getFavoriteStops } = useFavorites();

  const favoriteStops = getFavoriteStops();

  return (
    <div className="FavoritesPage">
      <div className="header">Favorite Stops</div>
      {favoriteStops.length ? (
        <List className="FavoritesPage">
          {favoriteStops.map((stopId: string) => (
            <FavoriteStopItem key={stopId} stopId={stopId} />
          ))}
        </List>
      ) : (
        <div className="EmptyFavorites">
          Add favorites by clicking the ☆ on a Stop.
        </div>
      )}
    </div>
  );
}

type FavoriteStopItemProps = {
  stopId: string;
};

function FavoriteStopItem({ stopId }: FavoriteStopItemProps) {
  const httpData = useHttpData(stopURL(stopId), 60000, Stop.fromJSON);
  const stopName = httpData.response?.name;
  const serviceMaps = httpData.response?.serviceMaps || [];

  let usualRouteIds: string[] = [];
  for (const serviceMap of serviceMaps) {
    if (serviceMap.configId === "weekday") {
      serviceMap.routes.forEach((route) => usualRouteIds.push(route.id));
    }
  }

  return (
    <Link to={`/stops/${stopId}`} state={{ stopName }}>
      <ListElement className="FavoriteStop">
        <ListOfRouteLogos
          routeIds={usualRouteIds}
          skipExpress={true}
          addLinks={false}
        />
        <div className="name">{stopName}</div>
      </ListElement>
    </Link>
  );
}
