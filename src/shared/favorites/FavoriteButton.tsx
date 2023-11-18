import React from 'react'
import './FavoriteButton.css'
import { useFavorites } from '../../modules/favorites';
import FavoriteIcon from './favorite.svg';
import FavoritedIcon from './favorited.svg';

type Props = {
    stopId: string;
};

export function FavoriteButton({ stopId }: Props) {
    const { isFavoriteStop, setFavoriteStop, removeFavoriteStop } = useFavorites();

    const handleClick = () => isFavoriteStop(stopId) ? removeFavoriteStop(stopId) : setFavoriteStop(stopId);

    return (
        <div className="FavoriteButton" onClick={handleClick}>
            <Icon favorited={isFavoriteStop(stopId)} />
        </div>
    );
}

type IconProps = {
    favorited: boolean;
};

function Icon({ favorited }: IconProps) {
    const label = favorited ? 'Favorited' : 'Favorite';
    return (
        <img 
            src={favorited ? FavoritedIcon : FavoriteIcon}
            alt={label}
            title={label}
        />
    );
}
