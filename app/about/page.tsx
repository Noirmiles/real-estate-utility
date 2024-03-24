"use client"
import React from 'react'
import './styles.css';
import {Button} from "@/components/ui/button"
import Cards from '@/components/Cards';
import SearchBar from '@/components/searchBar';

import Background from '@/components/background';
import { Input } from "@/components/ui/input"
//import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";
//import "./App.css";
 


export default function About() {
  return (
    <div>
      <Background/>
      
  
 {/*AboutTitle*/}

    <div className="mt-2 mb-8">
      
     
      <p className="font-heading text-3xl font-bold text-white">
       About
      </p>
    </div>
 




      
{/*Photograph */}

     <img src="https://barbaraiweins.com/wp-content/uploads/2021/05/Real-Estate-Agents.jpg"
     style={{ borderWidth: 20, borderColor: 'white', padding: 20, width: 700, height: 600, display: 'flex' }}/>
   <p className="text">Yokkkkur Text Here</p>
  
      <div style={{border: '4px solid white', display: 'flex', justifyContent: "right" }}>Real Estate Utilities is here to offer luxury housing to gorgeous people. Enter your name, email, and phone number to set up an inquiry. </div>

      <br />
      
                   
      <div className="container">
      <div className="row align-items-right">
        <div className="col-md-4">
          <img src="path_to_your_image.jpg" alt="Your Image" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <p>Your Text Here</p>
        </div>
      </div>
    </div>        
                
         
 

      <br />

    
   
{/*Input Email Address */}
 <Input type="searchEmail" placeholder="Email" />


  
    </div>
  );
}
