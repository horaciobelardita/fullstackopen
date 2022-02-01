import React from "react";

const products = [
  { name: "Notebook", properties: ["16gb ram", "512gb"] },
  { name: "Smartphone", properties: ["2gb ram", "128gb"] },
];

const Page = ({ title, children }) => {
  return (
    <div>
      <h1 style={{ color: "green" }}>{title}</h1>
      {children}
    </div>
  );
};

const Home = () => (
  <Page title="Home">
    <p>Home of the site</p>
  </Page>
);

const Product = ({ name, properties }) => (
  <div
    style={{
      border: "1px solid #000",
      marginBottom: "0.5rem",
      padding: "0.5rem",
    }}
  >
    <h4>{name}</h4>
    <ul>
      {properties.map((property, index) => (
        <li key={index}>{property}</li>
      ))}
    </ul>
  </div>
);

const Products = () => {
  return (
    <Page title="Products">
      {products.map((product) => (
        <Product {...product} key={product.name} />
      ))}
    </Page>
  );
};

const Route = () => {
  const { pathname } = window.location;
  if (pathname === "/") return <Home />;
  return <Products />;
};

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Route />
      </main>
    </>
  );
};

export default App;
