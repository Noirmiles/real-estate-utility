'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Background from '@/components/background';

// setting up the Signin form
const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Where the sign in logic needs to be handled, 
    console.log('Email:', email, 'Password:', password);
  };

  // Transparent box for the SignIn form
  const formStyle = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: '30px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    backdropFilter: 'blur(5px)', 
  };

  // Displays text to the SignIn form
  return (
    <div style={formStyle}>
      <h2 style= {{ fontSize: '24px',textAlign: 'center', margin: '20px 0'}}><b style={{color: 'black', fontWeight: 'bold'}}>Welcome to the Z Real Estate</b></h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <Button onClick={handleSignIn}>Sign in</Button>
      <a href="#" style={{ display: 'block', marginTop: '10px' }}><b style= {{color: 'blue', fontWeight:'bold'}}>Forgot your password?</b></a>
      <a href="/create-account" style={{ display: 'block', marginTop: '15x' }}>Don't have an account? <b style={{ color: 'blue', fontWeight: 'bold'}}>Create One</b></a>
    
    <div style={{textAlign: 'center', padding: '10px'}}>
      <div style= {{ borderTop: '1px solid #000', paddingTop: '10px'}}>
          < a href='houses' style= {{display: 'block', textDecoration: 'none'}}>
          <b style={{color: 'black', fontWeight: 'bold'}}>Continue as guest</b>
          </a>
      </div>
    </div>
    
    </div>
    
    
  );
};

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
        <SignInForm />
      </div>
    </div>
  );
}
