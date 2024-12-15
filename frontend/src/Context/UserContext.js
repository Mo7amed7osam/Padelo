import { createContext, useState } from "react";

export const user = createContext({});

export default function UserProvider({ children }) {
  const [auth, setAuth] = useState({});
  return <user.Provider value={{ auth, setAuth }}>{children}</user.Provider>;
}
