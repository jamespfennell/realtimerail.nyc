import { useLocalStorage } from './localstorage';

export const useFavorites = () => {
    const [favorites, setFavorites] = useLocalStorage('rtr.favorites', []);

    return {
        getFavoriteStops: () => favorites,
        isFavoriteStop: (stopId: string) => favorites.includes(stopId),
        setFavoriteStop: (stopId: string) => setFavorites([...favorites, stopId]),
        removeFavoriteStop: (stopId: string) => setFavorites([...favorites.filter((id: string) => id !== stopId)]),
        clearAllFavoriteStops: () => setFavorites([]),
    };
};
