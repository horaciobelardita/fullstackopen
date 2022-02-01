import React from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => (
  <UserContext.Provider value={{ name: "Andres" }}>
    {children}
  </UserContext.Provider>
);

export default UserContext;
