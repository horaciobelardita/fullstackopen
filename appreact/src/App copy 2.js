import React from "react";
const products = [
  {
    id: 1,
    name: "Smartphone",
    price: "R$ 2000",
    colors: ["#29d8d5", "#252a34", "#fc3766"],
  },
  {
    id: 2,
    name: "Notebook",
    price: "R$ 3000",
    colors: ["#ffd045", "#d4394b", "#f37c59"],
  },
  {
    id: 3,
    name: "Tablet",
    price: "R$ 1500",
    colors: ["#365069", "#47c1c8", "#f95786"],
  },
];
// show only product with price greater than 1500

const App = () => {
  const filterProductsByPrice = (minPrice) =>
    products
      .map((product) => ({
        ...product,
        price: +product.price.replace("R$ ", ""),
      }))
      .filter(({ price }) => price > minPrice);
  return (
    <section>
      {filterProductsByPrice(1500).map((product) => {
        return (
          <article key={product.id}>
            <h1>{product.name}</h1>
            <p>
              Price:{" "}
              {Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              }).format(product.price)}
            </p>
            {product.colors?.length > 0 && (
              <ul>
                {product.colors.map((color) => (
                  <li
                    key={color}
                    style={{
                      backgroundColor: color,
                      color: "#fff",
                      padding: "0.5rem",
                    }}
                  >
                    {color}
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </section>
  );
};

export default App;
