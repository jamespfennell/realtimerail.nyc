import { useLocalStorage } from "./localstorage";

export const useSeconds = () => {
  const [useSeconds, setUseSeconds] = useLocalStorage("rtr.seconds", false);

  return {
    toggleSeconds: () => setUseSeconds(!useSeconds),
    getUseSeconds: () => useSeconds,
  };
};
