import { createContext, useState } from "react";
export const UserContext = createContext(null);

export const UserConextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState("");
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
