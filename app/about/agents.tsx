"use client"
//import React, { constructor } from 'react'
import './styles.css';
import {Button} from "@/components/ui/button"
import Cards from '@/components/Cards';
import SearchBar from '@/components/searchBar';

import Background from '@/components/background';
import { Input } from "@/components/ui/input"
import { FormEvent } from 'react';
//import { constructor } from 'tailwindcss';
//import { constructor } from 'react';
//import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";
//import "./App.css";
 


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

  return (
    <div>
      <Background/>
      </div>
  )
}