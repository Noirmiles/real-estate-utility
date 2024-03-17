'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Background from '@/components/background';



// Agent Form 
const RegisterForm: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
  const [formData, setFormData] = useState({ 
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '', 
    manager: true, //Setting up intial boolean value
    agency: ''
});

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData( (prevFormData) => ({
        ...prevFormData,
        [name]:name === 'manager' ? value === 'true' : value, 
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
    borderRadius: '10px', // Slightly rounded corners for the form
    height: '42vh'
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
        <h2 style={headingStyle}>Register</h2>
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
        <select
        name="manager"
        value= {String(formData.manager)}
        onChange={handleSelectChange}
        >
            <option value= "true" >Manager</option>
            <option value= "false"> Not a Manager</option>
        </select>

        <select
            name="Agency"
            value={formData.agency}
            onChange={handleSelectChange}
          >  
            <option value= ""> Select an Agency</option>
            <option value= "z Test Agency">Z Test Agency</option>
        </select>


      <div style={{marginTop: '20px'}}></div>
      <button type="submit">Submit</button>
      <div style= {{ borderTop: '1px solid #000', paddingTop: '10px', width: '100%', marginTop: '10px'}}>
      <div style={{textAlign: 'center', padding: '10px'}}>
       <Button onClick={toggleForm} style={{marginTop: '25px'}}>
       Agent 
        </Button>
          </div>
    </div>
    </form>    
  

  );
};


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