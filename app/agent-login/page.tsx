'use client';
import React, { useState, FormEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Background from '@/components/background';
import { agent } from '../services/auth.service';

interface User {
  username: string;
  email?: string; 
}

interface FormData {
  username: string;
  password: string;
}

interface LoginResponse {
  user?: User;  // Defined more specifically
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

    try {
      const data = await agent(formData.username, formData.password);
      handleLoginSuccess(data);
    } catch (error) {
      setMessage('An error occurred during login.');
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
    margin: 'auto',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: '30px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    backdropFilter: 'blur(5px)'
  };

  return (
    <div style={formStyle}>
      <h2 style={{ fontSize: '24px', textAlign: 'center', margin: '20px 0' }}>
        <b style={{ color: 'black', fontWeight: 'bold' }}>Agent Login</b>
      </h2>
      {loginSuccess ? (
        <div>Loading...</div> // Placeholder while redirection is in progress
      ) : (
        <>
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
            <Button type="submit" disabled={loading}>
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
        </>
      )}
    </div>
  );
}

// SignIn component
export default function SignIn() {
  return (
    <div>
      <Background />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        transform: 'transformY(-10%)'}}>
        <AgentForm />
      </div>
    </div>
  );
}