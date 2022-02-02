import React from "react";
import { useFetch } from "./useFetch";

const url = "https://ranekapi.origamid.dev/json/api/usuario";

const formFields = [
  { id: "nome", label: "Nome", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "senha", label: "Senha", type: "password" },
  { id: "cep", label: "Cep", type: "text" },
  { id: "rua", label: "Rua", type: "text" },
  { id: "numero", label: "Numero", type: "number" },
  { id: "bairro", label: "Bairro", type: "text" },
  { id: "cidade", label: "Cidade", type: "text" },
  { id: "estado", label: "Estado", type: "text" },
];

const initialFormState = formFields.reduce((obj, field) => {
  return { ...obj, [field.id]: "" };
}, {});

const App = () => {
  const [form, setForm] = React.useState(initialFormState);
  const { doRequest, data, error, loading } = useFetch();
  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    doRequest(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(({ response }) => {
      response.ok && setForm(initialFormState);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formFields.map(({ id, label, type }) => {
          return (
            <div key={id} style={{ marginBottom: 10 }}>
              <label style={{ display: "block", marginBottom: 5 }} htmlFor={id}>
                {label}
              </label>
              <input
                onChange={handleChange}
                style={{ display: "block", width: "100%" }}
                type={type}
                id={id}
                value={form[id]}
              />
            </div>
          );
        })}
        <button disabled={loading} type="submit">
          Enviar
        </button>
      </form>
      {!loading && data && <p>Formulario Enviado</p>}
      {!loading && error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
