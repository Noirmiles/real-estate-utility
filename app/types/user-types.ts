//User variables
export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role:{ id: number; name: string }; 
  accessToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: IUser
}

export interface IRoles {
  agent: number;
  manager: number;
[key: string]: number;
}