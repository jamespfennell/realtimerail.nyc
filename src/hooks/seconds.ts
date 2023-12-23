import { useLocalStorage } from "./localstorage";

export const useSettings = () => {
  const [settings, setSettings] = useLocalStorage("rtr.settings", {
    useSeconds: false,
  });

  return {
    settings,
    setSettings,
  };
};
