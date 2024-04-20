import axios, { AxiosResponse } from 'axios';
import { IUser } from "../types/user-types";
import { LoginResponse } from "../types/user-types";
import eventBus from "@/components/common/EventBus";

// API route for authnenticating user 
const API_URL = "http://localhost:3000/auth/";

export const register = (username: string, password: string) => {
  return axios.post(API_URL + "registration", { username, password });
};

export const agent = (username: string, password: string): Promise<LoginResponse> => {
  return axios.post<LoginResponse>(API_URL + "agent-signin", { username, password })
    .then((response: AxiosResponse<LoginResponse>) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));  // Storing full response under 'user'
        return response.data;
      }
      throw new Error('AccessToken not found');
    });
};

export const login = (username: string, password: string): Promise<LoginResponse> => {
  return axios.post<LoginResponse>(API_URL + "login", { username, password })
    .then((response: AxiosResponse<LoginResponse>) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));  // Storing full response under 'user'
        return response.data;
      }
      throw new Error('AccessToken not found');
    });
};

export const logout = () => {
  localStorage.removeItem("user");  
  eventBus.dispatch('auth', { loggedIn: false });
};

export const getCurrentUser = (): IUser | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return user as IUser;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
};