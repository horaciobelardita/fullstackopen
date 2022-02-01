import React from "react";

const set1 = new Set();

const App = () => {
  const [counter, setCounter] = React.useState(0);

  const logger = React.useCallback(() => {
    console.log("useCallback");
  }, []);
  set1.add(logger);
  return (
    <div>
      <h4>{counter}</h4>
      <button onClick={() => setCounter((c) => c + 1)}>+1</button>
    </div>
  );
};

export default App;
