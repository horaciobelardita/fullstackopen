import React from "react";
import { useFetch } from "./useFetch";

const App = () => {
  const { doRequest, data, loading, error } = useFetch();

  React.useEffect(() => {
    doRequest("https://jsonplaceholder.typicode.com/todos").then(console.log);
  }, [doRequest]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (loading)
    return (
      <p style={{ fontSize: "1.5rem", textAlign: "center" }}>🔃 Loading... </p>
    );
  if (data)
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  return null;
};
export default App;
