import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./Provider";

export const useAxios = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { Authorization: "Bearer " + token },
  });
};

export const useAuth = () => {
  return useContext(AuthContext);
};