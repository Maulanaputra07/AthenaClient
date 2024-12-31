import axios from "axios";

export const useAxios = () => {
  return axios.create({ baseURL: "http://localhost:8000/api/" });
};

export const useAxios0 = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { Authorization: "Bearer " + token },
  });
};
