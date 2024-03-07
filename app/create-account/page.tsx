'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Background from '@/components/background';



// Form 
const CreateAccountForm: React.FC = () => {
  const [formData, setFormData] = useState({ 
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData( (prevFormData) => ({
        ...prevFormData,
        [name]: value, 
    }));
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This submits form to the backend server
    console.log(formData);
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: 'auto',
    maxWidth: '500px', 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background color for the form
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow to the form
    borderRadius: '8px', // Slightly rounded corners for the form
    height: '35vh'
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
    <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Create Account</h2>
      <input 
        type="text"
        name="firstName"
        placeholder="Enter First Name"

      />
      <input 
        type="text"
        name="lastName"
        placeholder="Enter Last Name"

      />
      <input 
        type="email"
        name="email"
        placeholder="Enter Email"

      />
      <input 
        type="text"
        name="username"
        placeholder="Create Username"

      />
      <input 
        type="password"
        name="password"
        placeholder="Create Password"

      />
      <div style={{marginTop: '20px'}}></div>
      <button type="submit">Submit</button>
    </form>
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
