"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { PrismaClient } from '@prisma/client';
import { Button } from "@/components/ui/button";
import Cardsv2 from '@/components/Cardsv2';
import SearchBar from '@/components/searchBar';
import Background from '@/components/background';
import SearchMenu from '@/components/SearchMenu';
//import '@fortawesome/fontawesome-free/css/all.css';

export default function Houses() {
  //State Variables
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [listings, setListings] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const menuRect = menuRef.current?.getBoundingClientRect();
    if (menuRect) {
      setDragOffset({
        x: event.clientX - menuRect.left,
        y: event.clientY - menuRect.top,
      });
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && menuRef.current) {
      menuRef.current.style.left = `${event.clientX - dragOffset.x}px`;
      menuRef.current.style.top = `${event.clientY - dragOffset.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);
  
  // Reference to the notification div element
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // Effect hook to handle clicking outside the notification menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
   
  // Function to toggle the popup state
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setShowNotifications(false);
  };

  // Function to toggle the notification menu state
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setIsPopupOpen(false);
  };

  // Function to mark notifications as read and reset the count
  const markAsRead = () => {
    setNotificationCount(0);
  };

  // Create a new instance of PrismaClient
  const prisma = new PrismaClient();

  // Component for the popup form
  const Popup = () => {
     // State variables for form fields
    const [selectedPropertyType, setSelectedPropertyType] = useState('');
    const [listPrice, setListPrice] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [squareFootage, setSquareFootage] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
    const [images, setImages] = useState<FileList | null>(null);

    // Function to handle property type selection change
    const handlePropertyTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedPropertyType(event.target.value);
    };

    // Function to handle image upload
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      setImages(files);
    };

     // Function to handle form submission
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
  
              <div>
              <label htmlFor="image-upload" className="block font-medium mb-1">Upload Images</label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {images && <span className="ml-2">{images.length} file(s) selected</span>}
              </div>
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
  <div
    ref={menuRef}
    className="fixed bg-white text-gray-800 rounded-md shadow-lg w-80 overflow-hidden"
    style={{ left: '82%', top: '20.5%', transform: 'translate(-50%, -50%)' }}
  >
    <div
      className="px-4 py-2 bg-gray-100 cursor-move"
      onMouseDown={handleMouseDown}
    >
      <h4 className="text-lg font-semibold">Notifications</h4>
    </div>
    <div className="px-4 py-2 max-h-60 overflow-y-auto">
      <ul className="divide-y divide-gray-200">
        <li className="py-2">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">You have a new Showing Request!</p>
              <p className="mt-1 text-sm text-gray-500">Jun 10, 2023</p>
            </div>
          </div>
        </li>
        <li className="py-2">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">New Listing Added.</p>
              <p className="mt-1 text-sm text-gray-500">Jun 9, 2023</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div className="px-4 py-2 bg-gray-100 text-right">
      <Button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={markAsRead}
      >
        Mark as Read
      </Button>
    </div>
  </div>
)}

      {isPopupOpen && <Popup />}
    </div>
  );
}
