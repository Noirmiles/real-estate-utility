// EditListingModal.tsx
import React, { useState } from 'react';

interface Property {
  id: number;
  listPrice: number;
  state: string;
  city: string;
  address: string;
  squareFootage: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  propertyType: string;
  agencyName: string;
  agentName: string;
  zipcode: number;
  description: string;
  alarmCode: number | null;
  subdivision: string | null;
}

interface EditListingModalProps {
  listing: Property;
  onClose: () => void;
  onUpdate: (updatedListing: Property) => void;
}

const EditListingModal: React.FC<EditListingModalProps> = ({ listing, onClose, onUpdate }) => {
  const [updatedListing, setUpdatedListing] = useState(listing);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedListing((prevListing: Property) => ({
      ...prevListing,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/listings?id=${listing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedListing),
      });
      if (response.ok) {
        onUpdate(updatedListing);
        onClose();
      } else {
        console.error('Error updating listing');
        // Handle error state or show an error message
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      // Handle error state or show an error message
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-6 rounded-md shadow-md max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="listPrice" className="block mb-1">
              List Price
            </label>
            <input
              type="number"
              id="listPrice"
              name="listPrice"
              value={updatedListing.listPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={updatedListing.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={updatedListing.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={updatedListing.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="squareFootage" className="block mb-1">
              Square Footage
            </label>
            <input
              type="number"
              id="squareFootage"
              name="squareFootage"
              value={updatedListing.squareFootage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfRooms" className="block mb-1">
              Number of Rooms
            </label>
            <input
              type="number"
              id="numberOfRooms"
              name="numberOfRooms"
              value={updatedListing.numberOfRooms}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfBathrooms" className="block mb-1">
              Number of Bathrooms
            </label>
            <input
              type="number"
              id="numberOfBathrooms"
              name="numberOfBathrooms"
              value={updatedListing.numberOfBathrooms}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="propertyType" className="block mb-1">
              Property Type
            </label>
            <input
              type="text"
              id="propertyType"
              name="propertyType"
              value={updatedListing.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="agencyName" className="block mb-1">
              Agency Name
            </label>
            <input
              type="text"
              id="agencyName"
              name="agencyName"
              value={updatedListing.agencyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="agentName" className="block mb-1">
              Agent Name
            </label>
            <input
              type="text"
              id="agentName"
              name="agentName"
              value={updatedListing.agentName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zipcode" className="block mb-1">
              Zipcode
            </label>
            <input
              type="number"
              id="zipcode"
              name="zipcode"
              value={updatedListing.zipcode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={updatedListing.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="alarmCode" className="block mb-1">
              Alarm Code
            </label>
            <input
              type="number"
              id="alarmCode"
              name="alarmCode"
              value={updatedListing.alarmCode || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subdivision" className="block mb-1">
              Subdivision
            </label>
            <input
              type="text"
              id="subdivision"
              name="subdivision"
              value={updatedListing.subdivision || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingModal;