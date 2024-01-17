import React from "react";

import { useFavorites } from "../hooks/favorites";
import { useHttpData } from "../hooks/http";
import { stopServiceMapsURL } from "../api/api";
import { ListStopsReply } from "../api/types";
import { ErrorMessage, LoadingPanel } from "../elements/BasicPage";
import ListOfStops from "../elements/ListOfStops";
import { useSettings } from "../hooks/settings";

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
  const { settings } = useSettings();
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
  let favoriteStopsData = httpData.response?.stops;
  // TODO this corrects the backend returning a response ordered by stop id instead of the order the IDs are passed in
  // possibly fix this in the backend
  if (!settings.alphabetizeFavoriteStops) {
    favoriteStopsData?.sort(
      (a, b) =>
        props.favoriteStops.indexOf(a.id) - props.favoriteStops.indexOf(b.id),
    );
  }
  return (
    <div>
      <LoadingPanel loaded={httpData.response !== null}>
        <ListOfStops
          stops={favoriteStopsData ?? []}
          orderByName={settings.alphabetizeFavoriteStops}
        />
      </LoadingPanel>
    </div>
  );
}
