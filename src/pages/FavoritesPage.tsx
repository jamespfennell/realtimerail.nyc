import React from "react";

import { useFavorites } from "../hooks/favorites";
import { useHttpData } from "../hooks/http";
import { stopServiceMapsURL } from "../api/api";
import { ListStopsReply } from "../api/types";
import { ErrorMessage, LoadingPanel } from "../elements/BasicPage";
import ListOfStops from "../elements/ListOfStops";

export default function FavoritesPage() {
  const { getFavoriteStops } = useFavorites();
  const favoriteStops = getFavoriteStops();

  return (
    <div>
      <h1>Favorite stops</h1>
      <h3>Add favorites by clicking the ☆ on a stop</h3>
      {favoriteStops.length === 0 ? null : (
        <Body favoriteStops={favoriteStops} />
      )}
    </div>
  );
}

function Body(props: { favoriteStops: string[] }) {
  const httpData = useHttpData(
    stopServiceMapsURL(props.favoriteStops),
    null,
    ListStopsReply.fromJSON,
  );
  if (httpData.error !== null) {
    return (
      <ErrorMessage tryAgainFunction={httpData.poll}>
        {httpData.error}
      </ErrorMessage>
    );
  }
  return (
    <div>
      <LoadingPanel loaded={httpData.response !== null}>
        <ListOfStops stops={httpData.response?.stops!} orderByName={true} />
      </LoadingPanel>
    </div>
  );
}
