"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { PrismaClient } from '@prisma/client';
import { Button } from "@/components/ui/button";
import Cardsv2 from '@/components/Cardsv2';
import SearchBar from '@/components/searchBar';
import Background from '@/components/background';
import SearchMenu from '@/components/SearchMenu';
import '@fortawesome/fontawesome-free/css/all.css';

export default function Houses() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [listings, setListings] = useState([]);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setIsPopupOpen(false);
  };

  const markAsRead = () => {
    setNotificationCount(0);
  };

  const prisma = new PrismaClient();

  const Popup = () => {
    const [selectedPropertyType, setSelectedPropertyType] = useState('');
    const [listPrice, setListPrice] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [squareFootage, setSquareFootage] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
    const [images, setImages] = useState<FileList | null>(null);

    const handlePropertyTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedPropertyType(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Handle form submission
    };

    return (
      <>
        {isPopupOpen && (
          <div className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-white p-8 rounded-l-lg shadow-lg transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-bold mb-6">Add Listing</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="list-price" className="block font-medium mb-1">List Price</label>
                  <input
                    type="number"
                    id="list-price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter list price"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block font-medium mb-1">State</label>
                  <input
                    type="text"
                    id="state"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block font-medium mb-1">City/County</label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city/county"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block font-medium mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address"
                  />
                </div>
              </div>
  
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="square-footage" className="block font-medium mb-1">Square Footage</label>
                  <input
                    type="number"
                    id="square-footage"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter square footage"
                  />
                </div>
                <div>
                  <label htmlFor="number-of-rooms" className="block font-medium mb-1">Number of Rooms</label>
                  <input
                    type="number"
                    id="number-of-rooms"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of rooms"
                  />
                </div>
                <div>
                  <label htmlFor="number-of-bathrooms" className="block font-medium mb-1">Number of Bathrooms</label>
                  <input
                    type="number"
                    id="number-of-bathrooms"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of bathrooms"
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="property-type" className="block font-medium mb-1">Property Type</label>
                <select
                  id="property-type"
                  value={selectedPropertyType}
                  onChange={handlePropertyTypeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Property Type</option>
                  <option value="standalone">Standalone House</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="apartment">Apartment</option>
                  <option value="duplex">Duplex</option>
                </select>
              </div>
  
              <div className="text-right">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      {/*<Background/> */}
      <div className="flex items-center h-16 p-6">
        <div className="flex-shrink-0">
          <a className="text-white text-xl font-bold text-center drop-shadow-lg">
            Real Estate & Homes For Sale
          </a>
        </div>
        <div className="ml-auto">
          <i
            className="fas fa-bell text-white text-2xl cursor-pointer relative"
            onClick={toggleNotifications}
          >
            {notificationCount > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                {notificationCount}
              </span>
            )}
          </i>
          <Button
            className="ml-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
            onClick={togglePopup}
          >
            Add Listing
          </Button>
        </div>
      </div>
      <div className="p-5 flex">
        <SearchBar />
        <SearchMenu />
      </div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(12,198,43,0.3),rgba(255,245,230,60))]">
      </div>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
      <div className="px-5 ">
        <Cardsv2 />
        <Cardsv2 />
      </div>

      {showNotifications && (
        <div ref={notificationRef} className="absolute top-16 right-6 bg-white text-gray-800 p-4 rounded-md shadow-lg w-64">
          <h4 className="mb-2 font-semibold">Notifications</h4>
          <ul>
            <li>Notification 1</li>
            <li>Notification 2</li>
            <li>Notification 3</li>
          </ul>
          <Button
            className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
            onClick={markAsRead}
          >
            Mark as Read
          </Button>
        </div>
      )}

      {isPopupOpen && <Popup />}
    </div>
  );
}
