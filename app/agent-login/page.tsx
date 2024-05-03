'use client';
import React, { useState, FormEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Background from '@/components/background';
import { agent } from '../services/auth.service';
import axios, { AxiosResponse } from 'axios';

interface User {
  username: string;
  email?: string;
}

interface FormData {
  username: string;
  password: string;
}

interface LoginResponse {
  user?: User;
  accessToken: string;
}

const AgentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    if (loginSuccess) {
      // Redirect to '/' automatically on login success
      window.location.href = '/';
    }
  }, [loginSuccess]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    // added error checking to handle axios/login responses 
    try {
      const data = await agent(formData.username, formData.password);  // Assuming `agent` is correctly typed to return a promise
      handleLoginSuccess(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Properly handle the error as an AxiosError
        if (error.response) {
          console.log("Data:", error.response.data);
          console.log("Status:", error.response.status);
          console.log("Headers:", error.response.headers);
          setMessage(error.response.data.message || "An error occurred.");
        } else {
          // The request was made but no response was received
          console.log("Request was made but no response received:", error.request);
          setMessage("The server did not respond.");
        }
      } else {
        // The error is not an AxiosError (could be network issue, timeout, etc.)
        console.error("An unexpected error occurred:", error);
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (data: LoginResponse) => {
    setLoginSuccess(true);
    setMessage('Login successful!');
    localStorage.setItem('accessToken', data.accessToken);
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    else {
      console.error("Email is missing in the user data")
    }
  };



  // Transparent box for the AgentIn form
  const formStyle = {
    maxWidth: '500px',
    minWidth: '375px',
    margin: 'auto',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
  };

  return (
    <div>
      {loginSuccess ? (
        <div></div> // Placeholder while redirection is in progress
      ) : (
        <div style={formStyle} >
          <h2 className="flex flex-col items-center" style={{ textAlign: 'center', margin: '20px 0' }}>
            <b style={{ fontSize: '24px', color: 'black', fontWeight: 'bold' }}>Welcome to the Zest</b>
            <b style={{ fontSize: '18px', color: 'black', fontWeight: 'bold' }}>Agent Login</b>

          </h2>

          <form onSubmit={handleSignIn}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '2px' }}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
                disabled={loading}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '2px' }}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
                disabled={loading}
              />
            </div>
            <Button className="rounded-md bg-white p-2" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Sign in'}
            </Button>
            {message && <div style={{ color: 'red', marginTop: '10px' }}>{message}</div>}
          </form>
          <a href="register" style={{ display: 'block', marginTop: '10px', color: 'blue', fontWeight: 'bold' }}>
            Register Account
          </a>
          <a href="/create-account" style={{ display: 'block', marginTop: '15px', color: 'blue', fontWeight: 'bold' }}>
            Forgot Your Credentials?
          </a>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{ borderTop: '1px solid #000', paddingTop: '10px' }}></div>
            <a href="/houses" style={{ display: 'block', textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              Continue as guest
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// SignIn component
export default function SignIn() {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-screen z-[-1] bg-gradient-to-r from-gray-900 to-black" />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        transform: 'transformY(-10%)'
      }}>
        <AgentForm />
      </div>
    </div>
  );
}