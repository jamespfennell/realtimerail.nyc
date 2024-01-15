import { useState, useEffect } from "react";

const getStorageValue = (key: string, defaultValue: any) => {
  const saved = localStorage.getItem(key);
  const initial = saved && JSON.parse(saved);
  return initial || defaultValue;
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() =>
    getStorageValue(key, defaultValue),
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
