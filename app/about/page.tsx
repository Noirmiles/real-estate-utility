"use client"
//import React, { constructor } from 'react'
import './styles.css';
import {Button} from "@/components/ui/button"
import Cards from '@/components/Cards';
import SearchBar from '@/components/searchBar';

import Background from '@/components/background';
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent } from 'react';
import { Calendar } from 'lucide-react';
//import { constructor } from 'tailwindcss';
//import { constructor } from 'react';
//import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";
//import "./App.css";



//import Calendar from 'react-calendar';


export default function About() {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  function setName(value: string): void {
    throw new Error('Function not implemented.');
  }

  function setEmail(value: string): void {
    throw new Error('Function not implemented.');
  }
 




  function setUsername(value: string): void {
    throw new Error('Function not implemented.');
  }

  function setPassword(value: string): void {
    throw new Error('Function not implemented.');
  }

  function deleteAppointment(id: any): void {
    throw new Error('Function not implemented.');
  }


  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  function setShowConfirmation(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }


  return (
    <div>
      <Background/>
      
  
 {/*AboutTitle*/}

    <div className="mt-2 mb-8">
      
     
      <p className="font-heading text-3xl font-bold text-white font-serif">
       About
      </p>
    </div>
 




      
{/*Photograph and Border */}

     <img src="https://barbaraiweins.com/wp-content/uploads/2021/05/Real-Estate-Agents.jpg"
     style={{ borderWidth: 20, borderColor: 'white', padding: 20, width: 700, height: 600, display: 'flex', font:'bold' }}/>
   
  {/* About Page Description  */}
      <div style={{border: '4px solid white', width:550,height:180, background:'grey', fontFamily: 'font-serif' , position: 'fixed', top: 90, right: 40 }}>Real Estate Utilities is here to offer luxury housing to gorgeous people. We are committed to delivering unparalleled service, leveraging innovative technology, and fostering lasting relationships with our clients and partners. With a focus on integrity, transparency, and sustainability, we strive to exceed expectations and empower individuals and families to find their dream homes. Please enter your name, email, and phone number below to set up an inquiry. </div>

      
      
 {/*Email Submission Box */}
      <div style={{border: '4px solid white', width:400, background:'grey', fontFamily: 'font-serif' , position: 'absolute', bottom: 3, right: 5 }}>
      <h2><div style={{ position: 'relative', right:0, left: 90 }}>Contact Form</div></h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            //value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            //value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            //value={phoneNumber}
            //onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div> 

    {/*Scheduling Section */}
    <p className="font-heading text-1xl font-bold text-white">
    Already submitted an inquiry? Schedule an appointment below!</p>

    <div>
    
      <Calendar
        //onChange={onchange}
       // values={Date}
      />

      <div>
      <h2>Appointments</h2>
      

    </div>
      <p className='"font-subtitle text-1xl font-bold text-black">'>Current Date: {Date()}</p>
    </div>
   
   <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" /*value={FormData.name}*/ onChange={handleChange} />
      <input type="date" name="date" /*name={FormData}*/ onChange={handleChange} />
      <input type="time" name="time" /*value={FormData}*/ onChange={handleChange} />
      <button type="submit">Add Appointment</button>
    </form>
    <div>
    
    </div>

      <br />

    
   

  
    </div>
  );
}
