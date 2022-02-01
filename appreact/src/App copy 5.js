import React from "react";
const baseUrl = "https://ranekapi.origamid.dev/json/api/produto/";
const products = ["tablet", "notebook", "smartphone"];

const Product = ({ nome, preco }) => (
  <div
    style={{
      border: "1px solid #000",
      margin: "0.5rem 0",
      padding: "0.5rem",
    }}
  >
    <h4>{nome}</h4>
    <p>
      Price:{" "}
      {new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(preco)}
    </p>
  </div>
);

const App = () => {
  const [selectedProduct, setSelectedProduct] = React.useState(() =>
    localStorage.getItem("product")
  );
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (!selectedProduct) return;
    setData(null);
    fetch(baseUrl + selectedProduct)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [selectedProduct]);

  React.useEffect(() => {
    if (!selectedProduct) return;
    window.localStorage.setItem("product", selectedProduct);
  }, [selectedProduct]);

  const handleClick = ({ target }) => {
    setSelectedProduct(target.innerText);
  };
  return (
    <div>
      <h2>Preferencia: {selectedProduct}</h2>
      {products.map((product) => (
        <button key={product} onClick={handleClick}>
          {product}
        </button>
      ))}
      {data && <Product {...data} />}
    </div>
  );
};

export default App;
