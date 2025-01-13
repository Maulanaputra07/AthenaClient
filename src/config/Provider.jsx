import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAxios } from "./hooks";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const beaxios = useAxios();
  useEffect(() => {
    beaxios
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err)
        setUser(null);
        localStorage.removeItem("token");
        return <Navigate to={"/"} />;
      });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
