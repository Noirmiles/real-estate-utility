
import * as AuthService from './services/auth.service';
import { IUser } from './types/user-types';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  username: string;
  email?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  isAuthenticated: false, 
  login: () => {},  // Placeholder function, will be overwritten
  logout: () => {}  // Placeholder function, will be overwritten
});

interface AuthProviderProps {
  children: ReactNode;  // Correct type for children, could be ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (token: string, user: User) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


