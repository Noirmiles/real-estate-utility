import axios, { AxiosResponse } from 'axios';
import { IUser } from "../types/user-types";
import { LoginResponse } from "../types/user-types";
import eventBus from "@/components/common/EventBus";
import { Agent } from '@prisma/client';
import { Omit } from '@prisma/client/runtime/library';

type SafeAgent = Omit<Agent, 'password'>;

// API route for authnenticating user 
const API_URL = "http://localhost:3000/auth/";

export const register = (username: string, password: string) => {
  return axios.post(API_URL + "registration", { username, password });
};

export const agent = (username: string, password: string): Promise<LoginResponse> => {
  return axios.post<LoginResponse>(`${API_URL}agent-signin`, { username, password })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
      throw new Error('AccessToken not found');
    }).catch();
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

// Adjusting the interface to handle errors more gracefully
interface FetchAgentsResponse {
  agents?: SafeAgent[]; // Making `agents` optional
  error?: string; // Optional field for handling errors
}

export const fetchAgentsByRole = (roleId: number): Promise<FetchAgentsResponse> => {
  return axios.get<FetchAgentsResponse>(`${API_URL}/agents-by-role`, { params: { roleId } })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching agents:', error);
        return { error: error.message };
    });
};

