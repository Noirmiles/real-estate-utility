"use client";

import React, { useState, ReactElement, useEffect, useRef, ChangeEvent, FormEvent, lazy } from 'react';
import { PrismaClient } from '@prisma/client';
import { Button } from "@/components/ui/button";
import BuyColumn from '@/components/BuyColumn';
import SearchBar from '@/components/searchBar';
import SearchMenu from '@/components/SearchMenu';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from '@/components/map'
import { getCurrentUser } from '@/app/services/auth.service';  
import { IUser } from '../types/user-types';


export default function Houses() {


  //State Variables
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listings, setListings] = useState([]);
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

  //For Map loading
  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };

  //Map constants
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term in main page
  const [mapCenter, setMapCenter] = useState({ lat: 34.7287, lng: -86.5879 });

  const handleSearch = async () => {
    // ... Geocoding logic to update map center based on searchTerm
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]); // Trigger search on searchTerm change

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

  // Function to toggle the popup state
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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
    const [zipcode, setZipcode] = useState('');
    const [squareFootage, setSquareFootage] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
    const [images, setImages] = useState<FileList | null>(null);
    const [selectedAgency, setSelectedAgency] = useState('');
    const [agentName, setAgentName] = useState('');

    // Function to handle property type selection change
    const handlePropertyTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedPropertyType(event.target.value);
    };

    // Function to handle agency selection change
    const handleAgencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedAgency(event.target.value);
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
        formData.append('zipcode', zipcode);
        formData.append('squareFootage', squareFootage);
        formData.append('numberOfRooms', numberOfRooms);
        formData.append('numberOfBathrooms', numberOfBathrooms);
        formData.append('propertyType', selectedPropertyType);
        formData.append('agencyName', selectedAgency);
        formData.append('agentName', agentName);

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
          setZipcode('');
          setAgentName('');
          setSelectedAgency('');
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
                <div>
                  <label htmlFor="zipcode" className="block font-medium mb-1">Zipcode</label>
                  <input
                    type="number"
                    id="zipcode"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
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
                <label htmlFor="agency" className="block font-medium mb-1">Agency</label>
                <select
                  id="agency"
                  value={selectedAgency}
                  onChange={handleAgencyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Agency</option>
                  <option value="Premier Homes">Premier Homes</option>
                  <option value="Luxury Living">Luxury Living</option>
                  <option value="Prestige Properties">Prestige Properties</option>
                </select>
              </div>

              <div>
                <label htmlFor="agent-name" className="block font-medium mb-1">Listing Agent Name</label>
                <input
                  type="text"
                  id="agent-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter agent name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
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


  //Checks Google API Map Key 
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    setUser(getCurrentUser()); //  getCurrentUser() fetches the logged-in user's details
}, []);

const isAgent = user && user.role.name === 'agent';
  return (
    <div className="relative top-0 h-full w-full bg-gradient-to-r from-gray-900 to-black">
      {/*<Background/> */}

      <div className="main">
        <div className="add-bar flex items-center h-16 p-6 relative z-10 ">
          <div className="flex-shrink-0">
            <a className="text-white text-xl font-bold text-center drop-shadow-lg">
              Real Estate & Homes For Sale
            </a>
          </div>
          <div className="ml-auto relative z-20">
            <i
              className="fas fa-bell text-white text-2xl cursor-pointer relative"
            >
            </i>
            {isAgent && (
            <Button
              className="ml-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
              onClick={togglePopup}
            >
              Add Listing
            </Button>
            )}
          </div>
        </div>
        <div className="options-bar p-4 flex ">
          <SearchBar />
          <SearchMenu />
        </div>

        <div className='objects-bar flex'>
          <div className='map-container'>
            <Wrapper apiKey={'AIzaSyA3hodoDpLt7mDpN1fL8d9RnrW8i8jaJSA'} render={render}>
              <Map center={{ lat: 34.7287, lng: -86.5879 }} zoom={10} />
            </Wrapper>
          </div>

          <div className='ml-36'>
            <BuyColumn />
          </div>
        </div>
        {isPopupOpen && <Popup />}
      </div>
    </div>


  );
}
