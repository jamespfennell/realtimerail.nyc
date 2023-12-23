import { useLocalStorage } from "./localstorage";

export const useSettings = () => {
  const [settings, setSettings] = useLocalStorage("rtr.seconds", {
    useSeconds: false,
  });

  return {
    settings,
    setSettings,
  };
};
