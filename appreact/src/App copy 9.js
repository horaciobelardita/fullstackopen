import React from "react";
import GlobalContext, { GlobalContextProvider } from "./GlobalContext";

const Products = () => {
  const { products, preference, reset, setPreference } =
    React.useContext(GlobalContext);
  return (
    <div>
      {products.map((product) => (
        <p
          style={{
            width: 150,
            textAlign: "center",
            cursor: "pointer",
            fontWeight: preference === product.nome ? "bold" : "initial",
            border:
              preference === product.nome ? "2px dashed red" : "2px solid #eee",
          }}
          key={product.id}
          onClick={() => setPreference(product.nome)}
        >
          {product.nome}
        </p>
      ))}
      <button onClick={reset}>Limpiar context</button>
    </div>
  );
};

const App = () => {
  return (
    <GlobalContextProvider>
      <Products />
    </GlobalContextProvider>
  );
};

export default App;
