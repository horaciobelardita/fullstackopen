import React, { createContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const GlobalContext = createContext({
  products: [],
  reset: () => {},
  preference: "",
  setPreference: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [products, setProducts] = React.useState([]);
  const [preference, setPreference] = useLocalStorage("product", "");

  React.useEffect(() => {
    fetch("https://ranekapi.origamid.dev/json/api/produto/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const reset = React.useCallback(() => setProducts([]), []);

  return (
    <GlobalContext.Provider
      value={{
        products,
        reset,
        preference,
        setPreference,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
