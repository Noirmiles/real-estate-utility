"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { PrismaClient } from '@prisma/client';
import { Button } from "@/components/ui/button";
import Card from '@/components/Card';
import SearchBar from '@/components/searchBar';
import Background from '@/components/background';
import SearchMenu from '@/components/SearchMenu';
//import '@fortawesome/fontawesome-free/css/all.css';

export default function Houses() {
  //State Variables
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [listings, setListings] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const [listPriceError, setListPriceError] = useState('');
  const [squareFootageError, setSquareFootageError] = useState('');
  const [numberOfRoomsError, setNumberOfRoomsError] = useState('');
  const [numberOfBathroomsError, setNumberOfBathroomsError] = useState('');

  // Functions to verify valid inputs
  const validateListPrice = (value: string) => {
    const price = parseFloat(value);
    if (isNaN(price) || price <= 0) {
      setListPriceError('Please enter a valid positive list price.');
    } else {
      setListPriceError('');
    }
  };

  const validateSquareFootage = (value: string) => {
    const footage = parseFloat(value);
    if (isNaN(footage) || footage <= 0) {
      setSquareFootageError('Please enter a valid positive square footage.');
    } else {
      setSquareFootageError('');
    }
  };

  const validateNumberOfRooms = (value: string) => {
    const rooms = parseInt(value);
    if (isNaN(rooms) || rooms <= 0) {
      setNumberOfRoomsError('Please enter a valid positive number of rooms.');
    } else {
      setNumberOfRoomsError('');
    }
  };

  const validateNumberOfBathrooms = (value: string) => {
    const bathrooms = parseInt(value);
    if (isNaN(bathrooms) || bathrooms <= 0) {
      setNumberOfBathroomsError('Please enter a valid positive number of bathrooms.');
    } else {
      setNumberOfBathroomsError('');
    }
  };

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
      if (files) {
        const selectedImages = Array.from(files);
        setImages((prevImages) => {
          const dataTransfer = new DataTransfer();
          if (prevImages) {
            for (let i = 0; i < prevImages.length; i++) {
              dataTransfer.items.add(prevImages[i]);
            }
          }
          selectedImages.forEach((image) => {
            dataTransfer.items.add(image);
          });
          return dataTransfer.files;
        });
      }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Validate form fields
      validateListPrice(listPrice);
      validateSquareFootage(squareFootage);
      validateNumberOfRooms(numberOfRooms);
      validateNumberOfBathrooms(numberOfBathrooms);

      // Check if there are any errors
      if (listPriceError || squareFootageError || numberOfRoomsError || numberOfBathroomsError) {
        return;
      }

      try {
        const formData = new FormData();
        formData.append('listPrice', listPrice);
        formData.append('state', state);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('squareFootage', squareFootage);
        formData.append('numberOfRooms', numberOfRooms);
        formData.append('numberOfBathrooms', numberOfBathrooms);
        formData.append('propertyType', selectedPropertyType);

        if (images) {
          Array.from(images).forEach((image) => {
            formData.append('images', image);
          });
        }

        const response = await fetch('/houses/createProperty', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Property created successfully');
          // Reset form fields
          setListPrice('');
          setState('');
          setCity('');
          setAddress('');
          setSquareFootage('');
          setNumberOfRooms('');
          setNumberOfBathrooms('');
          setSelectedPropertyType('');
          setImages(null);
          // Close the popup
          setIsPopupOpen(false);
          // Display the alert
          alert('Property created successfully!');
          // Refetch the listings data
          const listingsResponse = await fetch('/houses');
          const listingsData = await listingsResponse.json();
          setListings(listingsData);
        } else {
          const errorData = await response.json();
          console.error('Error creating property:', errorData.error);
          // Handle the error, show an error message, etc.
        }
      } catch (error) {
        console.error('Error creating property:', error);
        // Handle the error, show an error message, etc.
      }
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
                    value={listPrice}
                    onChange={(e) => {
                      setListPrice(e.target.value);
                      validateListPrice(e.target.value);
                    }}

                  />
                </div>
                <div>
                  <label htmlFor="state" className="block font-medium mb-1">State</label>
                  <select
                    id="state"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select a state</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="block font-medium mb-1">City/County</label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city/county"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block font-medium mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={squareFootage}
                    onChange={(e) => {
                      setSquareFootage(e.target.value);
                      validateSquareFootage(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="number-of-rooms" className="block font-medium mb-1">Number of Rooms</label>
                  <input
                    type="number"
                    id="number-of-rooms"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of rooms"
                    value={numberOfRooms}
                    onChange={(e) => {
                      setNumberOfRooms(e.target.value);
                      validateNumberOfRooms(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="number-of-bathrooms" className="block font-medium mb-1">Number of Bathrooms</label>
                  <input
                    type="number"
                    id="number-of-bathrooms"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of bathrooms"
                    value={numberOfBathrooms}
                    onChange={(e) => {
                      setNumberOfBathrooms(e.target.value);
                      validateNumberOfBathrooms(e.target.value);
                    }}
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
                  <option value="Standalone House">Standalone House</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Duplex">Duplex</option>
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
                  {images && images.length > 0 && <span className="ml-2">{images.length} file(s) selected</span>}
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
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-gradient-to-r from-gray-900 to-black"></div>

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

      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
      <div className="px-5 ">
        <Card></Card>
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
