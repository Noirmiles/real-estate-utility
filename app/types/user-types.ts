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

export interface MessageData {
  senderId: number;
  receiverId: number;
  content: string;
  propertyId?: number;  // Optional property ID
}

interface Agent {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role:{ id: number;}
}

interface MessageInput {
    senderId: number;
    receiverId: number;
    content: string;
    propertyId?: number; // Optional field
}