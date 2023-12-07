import React from "react";
import "./FavoriteButton.css";
import { useFavorites } from "./hooks/favorites";

type Props = {
  stopId: string;
};

export function FavoriteButton({ stopId }: Props) {
  const { isFavoriteStop, setFavoriteStop, removeFavoriteStop } =
    useFavorites();

  const handleClick = () => {
    isFavoriteStop(stopId)
      ? removeFavoriteStop(stopId)
      : setFavoriteStop(stopId);
  };

  return (
    <span className="FavoriteButton" onClick={handleClick}>
      {isFavoriteStop(stopId) ? "★" : "☆"}
    </span>
  );
}
