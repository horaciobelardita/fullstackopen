import React from "react";
import UserContext, { UserProvider } from "./UserContext";

const User = () => {
  const { name } = React.useContext(UserContext);
  return <div>{name}</div>;
};

const App = () => {
  return (
    <UserProvider>
      <User />
    </UserProvider>
  );
};

export default App;
