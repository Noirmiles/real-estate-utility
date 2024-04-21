"use client"
import './styles.css';
import { Button } from "@/components/ui/button"
import Card from '@/components/Card';
import SearchBar from '@/components/searchBar';
import Background from '@/components/background';
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from 'react';
import { Calendar } from 'lucide-react';

export default function About() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    // Handle form submission
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className= "bg-gradient-to-r from-gray-900 to-black">
    <div className="min-h-screen p-24">

      {/* About Title */}
      <div className="mb-8 text-center">
        <p className="font-heading text-3xl font-bold text-white font-serif">
          About
        </p>
      </div>

      {/* Photograph and Border */}
      <div className="flex justify-center">
        <img
          src="https://barbaraiweins.com/wp-content/uploads/2021/05/Real-Estate-Agents.jpg"
          className="max-w-3xl border-8 border-white p-4 rounded-sm"
          alt="Real Estate Agents"
        />
      </div>

      {/* About Page Description */}
      <div className="mx-auto mt-8 max-w-lg bg-gray-800 p-6 text-white">
      <p>
        At Real Estate Utilities, we specialize in providing luxurious housing solutions tailored to discerning clientele. Our unwavering commitment to excellence is reflected in our unparalleled service, cutting-edge technology, and enduring partnerships with clients and industry leaders. With integrity, transparency, and sustainability at the core of our operations, we strive to exceed expectations and empower individuals and families in their pursuit of their dream homes. To initiate an inquiry, please provide your name, email, and phone number in the form below.
      </p>
    </div>

      {/* Email Submission Box */}
      <div className="mx-auto mt-8 max-w-md bg-gray-800 p-6 text-white">
        <h2 className="text-center text-2xl font-bold mb-4">Contact Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Scheduling Section */}
      <div className="mt-8 text-center">
        <p className="font-heading text-xl font-bold text-white">
          Already submitted an inquiry? Schedule an appointment below!
        </p>
        <div className="flex justify-center mt-4">
          <Calendar className="text-white" size={48} />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2 text-gray-500">Appointments</h2>
          <p className="font-subtitle text-xl font-bold text-white">Current Date: {new Date().toLocaleDateString()}</p>
        </div>
        <form className="mt-4 space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
            />
            <input
              type="date"
              name="date"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
            />
            <input
              type="time"
              name="time"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
          >
            Add Appointment
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}