import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./Provider";

export const useAxios = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://103.174.115.6:8123/api",
    headers: { Authorization: "Bearer " + token },
  });
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const getSheetName = (jurusan) => {
  const words = jurusan.split(" ");
  let shortName = words
    .map((word) =>
      word.charAt(0) === word.charAt(0).toUpperCase()
        ? word.charAt(0).toUpperCase()
        : ""
    )
    .join("");
  return shortName.length <= 31 ? shortName : shortName.substring(0, 31);
};

export function getGenderText(value) {
  if (value === 1) {
    return "Laki-laki";
  } else if (value === 0) {
    return "Perempuan";
  } else {
    return "Tidak Diketahui";
  }
}
