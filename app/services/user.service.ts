//Page is null for now

import axios from "axios";
import authHeader from "./auth-header";


const API_URL = "http://localhost:3000/auth/authenticate";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() })
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching user board:", error.response ? error.response.data : "Unknown error");
      throw error;
    });
}
export const getAgentBoard = () => {
  return axios.get(API_URL + "agent", { headers: authHeader() });
};

export const getManagerBoard = () => {
  return axios.get(API_URL + "manager", { headers: authHeader() });
};