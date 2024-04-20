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
  manager: boolean;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    manager: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === 'true' }));
  };

  const validateForm = (): boolean => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
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
      const response = await fetch('/auth/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Failed to register account');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server');
    }
  };

  const inputStyle = { margin: '5px 0', padding: '8px', width: '100%' };

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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // or 'white'
    width: 'fit-content',
    alignSelf: 'center'
  };

  return (

    <div style={formStyle}>
    <h2 style={headingStyle}>Register</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" 
        name="firstName" 
        value={formData.firstName} 
        onChange={handleChange} 
        placeholder="First Name" 
        required style={inputStyle} 
        />
        <input type="text" 
        name="lastName" 
        value={formData.lastName} 
        onChange={handleChange} 
        placeholder="Last Name" 
        required style={inputStyle} 
        />
        <input type="email"
         name="email" 
         value={formData.email} 
         onChange={handleChange} 
         placeholder="Email" 
         required style={inputStyle} 
         />
        <input type="text" 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
        placeholder="Username" 
        required style={inputStyle} 
        />
        <input type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="Password" 
        required style={inputStyle} 
        />
        <select name="manager" 
        value={String(formData.manager)} 
        onChange={handleSelectChange} 
        style={inputStyle}>
          <option value="true">Manager</option>
          <option value="false">Not a Manager
          </option>
        </select>
        <Button type="submit" disabled={isSubmitted} style={{ marginTop: '20px', width: '100%' }}>Register</Button>
        {isSubmitted && <p style={{ color: 'green' }}>Account registered successfully! <Link href="/agent-login">Go to Sign In</Link></p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default function Register() {
  return (
    <div>
      <Background />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        transform: 'transformY(-10%)',
      }}>
        <RegisterForm />
      </div>
    </div>
  );
}

/* This is omitted at the moment - 4/15/2024


//Agency Form 
const AgencyForm: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
    const[formData, setFormData] = useState({
        Agency: '', 
    })

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
        padding: '10px',
        margin: 'auto',
        maxWidth: '300px', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background color for the form
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow to the form
        borderRadius: '12px', // Slightly rounded corners for the form
        height: '28vh'
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
            <h2 style={headingStyle}>Register </h2>
            <input
            type="text"
            name="Agency"
            placeholder= "Enter Agency"

            />
      <div style={{marginTop: '20px'}}></div>
      <button type="submit">Submit</button>
      <div style= {{ borderTop: '1px solid #000', paddingTop: '10px', width: '100%', marginTop: '15px'}}>
      <div style={{textAlign: 'center', padding: '10px'}}>
      <Button onClick={toggleForm} style={{marginTop: '15px'}}>
       Agency
      </Button>
      </div>
      </div>
    </form>
  );
};



export default function Regsiter() {
    const [isAgency, setIsAgency]=useState(false);

    const toggleForm = () => {
        setIsAgency(!isAgency);
    };

    return (
        <div>
         <Background />
        <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        transform: 'transformY(-10%)'}}>
    
        {isAgency ? ' Agency' : ' Agent' }    
  
        {isAgency ? <AgencyForm toggleForm={toggleForm}/> : <RegisterForm toggleForm={toggleForm}/> }
        </div>
        </div>
    );

}
*/