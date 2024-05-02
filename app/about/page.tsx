"use client"
import './styles.css';
import { Button } from "@/components/ui/button"
import SearchBar from '@/components/searchBar';
import Background from '@/components/background';
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from 'react';
import { Calendar } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import { useEffect } from 'react';

const prisma = new PrismaClient();

interface Property {
  id: number;
  address: string;
  agentName: string;
  agencyName: string;
}

export default function About() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentCompany, setAgentCompany] = useState('');
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handlePropertyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPropertyId = event.target.value;
    setSelectedProperty(selectedPropertyId);
  
    // Find the selected property from the properties array
    const property = properties.find((p) => p.id === parseInt(selectedPropertyId));
    console.log('Selected Property:', property);
  
    if (property) {
      setAgentName(property.agentName || '');
      setAgentCompany(property.agencyName || '');
      console.log('Agent Name:', property.agentName);
      console.log('Agency Name:', property.agencyName);
    } else {
      setAgentName('');
      setAgentCompany('');
    }
  };

  const handleAppointmentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  const appointmentDate = event.currentTarget.date.value;
  const appointmentTime = event.currentTarget.time.value;
  const scheduledAt = `${appointmentDate}T${appointmentTime}:00`;

  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyId: selectedProperty,
        scheduledAt,
        agentName,
        agentCompany,
      }),
    });

      if (response.ok) {
        // Reset form fields after successful submission
        setAppointmentName('');
        setAppointmentDate('');
        setAppointmentTime('');
        setSelectedProperty('');
        alert('Appointment added successfully!');
      } else {
        alert('Failed to add appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert('An error occurred while adding the appointment. Please try again.');
    }
  };

  

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      const fetchedProperties: Property[] = await response.json();
      setProperties(fetchedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);

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
    <div className="top-0 left-0 w-full h-full z-[-1] bg-gradient-to-r from-gray-900 to-black">
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
          <form onSubmit={handleAppointmentSubmit} className="mt-4 space-y-4">
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
            <div>
              <label htmlFor="propertyAddress" className="block text-white mb-1">
                Select Property:
              </label>
              <select
                id="propertyAddress"
                name="propertyAddress"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                value={selectedProperty}
                onChange={handlePropertyChange}
              >
                <option value="">-- Select a Property --</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.address}
                  </option>
                ))}
              </select>
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