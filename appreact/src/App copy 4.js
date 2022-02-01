import React from "react";

const baseUrl = "https://ranekapi.origamid.dev/json/api/produto/";
const products = ["tablet", "notebook", "smartphone"];

const Product = ({ nome, preco, descricao, fotos }) => (
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
    <p>{descricao}</p>
    {fotos?.length > 0 && (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {fotos.map((foto) => (
          <img
            key={foto.titulo}
            style={{ width: "100%", height: "auto" }}
            src={foto.src}
            alt={foto.titulo}
          />
        ))}
      </div>
    )}
  </div>
);

const App = () => {
  const [state, setState] = React.useState({ data: null, loading: false });

  const handleClick = (event) => {
    const product = event.target.innerText;
    setState(() => ({ data: null, loading: true }));
    fetch(baseUrl + product)
      .then((res) => res.json())
      .then((data) => setState({ data, loading: false }));
  };
  const { loading, data } = state;
  return (
    <div>
      {products.map((product) => (
        <button onClick={handleClick} key={product}>
          {product}
        </button>
      ))}
      {loading && <p>Loading...</p>}
      {!loading && data && <Product {...data} />}
    </div>
  );
};

export default App;
