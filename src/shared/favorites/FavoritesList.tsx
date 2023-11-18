import React from 'react';
import './FavoritesList.css';
import { List, ListElement } from '../../util/List';
import { Link } from 'react-router-dom';
import { useFavorites } from './hooks/favorites';
import { useHttpData } from '../../pages/http';
import { stopURL } from '../../api/api';
import { Stop } from '../../api/types';
import ListOfRouteLogos from '../routelogo/ListOfRouteLogos';

export function FavoritesList() {
    const { getFavoriteStops } = useFavorites();
    const favoriteStops = getFavoriteStops();

    return favoriteStops.length ? (
        <div className="FavoritesList">
            <div className="SubHeading">Favorite Stops</div>
            <List className="FavoritesList">
                {favoriteStops.map((stopId: string) => <FavoriteStopItem key={stopId} stopId={stopId} />)}
            </List>
        </div>
    ) : null;
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
      if (serviceMap.configId === 'weekday') {
        serviceMap.routes.forEach(
          route => usualRouteIds.push(route.id)
        )
      }
    }

    return (
      <Link to={`/stops/${stopId}`} state={{ stopName }}>
        <ListElement className="FavoriteStop">
            <ListOfRouteLogos routeIds={usualRouteIds} skipExpress={true} addLinks={false} />
            <div className="name">{stopName}</div>
        </ListElement>
      </Link>
    )
  }