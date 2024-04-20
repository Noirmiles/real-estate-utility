//User variables
export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  accessToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: IUser
}
