const luana = {
  cliente: "Luana",
  idade: 27,
  compras: [
    { nome: "Notebook", preco: "R$ 2500" },
    { nome: "Geladeira", preco: "R$ 3000" },
    { nome: "Smartphone", preco: "R$ 1500" },
  ],
  ativa: true,
};

const mario = {
  cliente: "Mario",
  idade: 31,
  compras: [
    { nome: "Notebook", preco: "R$ 2500" },
    { nome: "Geladeira", preco: "R$ 3000" },
    { nome: "Smartphone", preco: "R$ 1500" },
    { nome: "Guitarra", preco: "R$ 3500" },
  ],
  ativa: false,
};
const arr = [1, 2, 3];
function App() {
  const data = luana;

  const prices = data.compras
    .map((compra) => compra.preco.replace("R$ ", ""))
    .map((price) => +price);
  const total = prices.reduce((acum, price) => acum + price, 0);
  return (
    <div className="App">
      <p>App React</p>
      <p
        style={{
          color: "blue",
        }}
      >
        {new Date().getFullYear()}
      </p>
      <p>Name: {data.cliente}</p>
      <p>Age: {data.idade}</p>
      <p>
        Status:{" "}
        <span
          style={{
            color: data.ativa ? "green" : "red",
          }}
        >
          {data.ativa ? "Active" : "Inactive"}
        </span>
      </p>
      <p>Total : ${total}</p>
      {total > 10000 && <p>Usted esta gastando mucho</p>}
      <div>
        <ul>
          {arr.map((el) => (
            <li>{el}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
