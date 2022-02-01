import React from "react";

export const useLocalStorage = (key, initial = "") => {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? initial
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state, key]);

  return [state, setState];
};
