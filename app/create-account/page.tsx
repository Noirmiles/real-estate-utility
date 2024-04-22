'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Background from '@/components/background';
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const CreateAccountForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ 
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }
    if (!formData.password || formData.password.length < 6 || formData.password.length > 40) {
      setErrorMessage("Password must be between 6 and 40 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitted(false);
    setErrorMessage('');

    try {
      const response = await fetch('/auth/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      

      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Failed to create account');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server');
    }
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    margin: 'auto',
    maxWidth: '500px', 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background color for the form
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow to the form
    borderRadius: '8px', // Slightly rounded corners for the form
    height: '50vh'
  };

  const headingStyle:React.CSSProperties = {
    fontSize: '30px',
    textAlign: 'center',
    margin: '20 px 0',
    marginBottom: '40px',
    color: 'black',
    fontWeight: 'bold',
    border: '1px solid #000',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: 'fff',
    width: 'fit-content',
    alignSelf: 'center'
  };


  return (
      <div style={formStyle}>
        <h2 style={headingStyle}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            style={{  margin: '5px 0', padding: '8px', width: '100%' }}
          />
          <input 
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            style={{ margin: '5px 0', padding: '8px', width: '100%' }}
          />
            <input type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="Username" 
            required 
            style={{ margin: '10px 0', padding: '8px', width: '100%' }} 
            />
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{ margin: '5px 0', padding: '8px', width: '100%' }}
          />
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{ margin: '5px 0', padding: '8px', width: '100%' }}
          />
          <Button type="submit" disabled={isSubmitted} style={{ margin: '5 px 0' }}>
            Create Account
          </Button>
          {isSubmitted && (
            <p>Account created successfully! <Link href="/sign-in">Go to Sign In</Link></p>
          )}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
    
  );
};

export default function CreateAccount() {
  return (
      <div>
       <Background />
      <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      transform: 'transformY(-10%)'}}>
      <CreateAccountForm />

      </div>
      </div>
  );

}
