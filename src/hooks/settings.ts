import { useLocalStorage } from "./localstorage";

export const useSettings = () => {
  const [settings, setSettings] = useLocalStorage("rtr.settings", {
    useSeconds: false,
    alphabetizeFavoriteStops: true,
  });

  return {
    settings,
    setSettings,
  };
};
