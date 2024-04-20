import React, { useState } from 'react';

interface PropertyData {
  id: number;
  listPrice: number;
  state: string;
  city: string;
  address: string;
  squareFootage: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  propertyType: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface EditPropertyFormProps {
  property: PropertyData;
  onSubmit: (updatedProperty: PropertyData) => void;
  onCancel: () => void;
}

const EditPropertyForm: React.FC<EditPropertyFormProps> = ({ property, onSubmit, onCancel }) => {
  const [updatedProperty, setUpdatedProperty] = useState<PropertyData>(property);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUpdatedProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(updatedProperty);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="listPrice" className="block font-medium text-gray-700">
          List Price:
        </label>
        <input
          type="number"
          id="listPrice"
          name="listPrice"
          value={updatedProperty.listPrice}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="state" className="block font-medium text-gray-700">
          State:
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={updatedProperty.state}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="city" className="block font-medium text-gray-700">
          City:
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={updatedProperty.city}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="address" className="block font-medium text-gray-700">
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={updatedProperty.address}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="squareFootage" className="block font-medium text-gray-700">
          Square Footage:
        </label>
        <input
          type="number"
          id="squareFootage"
          name="squareFootage"
          value={updatedProperty.squareFootage}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="numberOfRooms" className="block font-medium text-gray-700">
          Number of Rooms:
        </label>
        <input
          type="number"
          id="numberOfRooms"
          name="numberOfRooms"
          value={updatedProperty.numberOfRooms}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="numberOfBathrooms" className="block font-medium text-gray-700">
          Number of Bathrooms:
        </label>
        <input
          type="number"
          id="numberOfBathrooms"
          name="numberOfBathrooms"
          value={updatedProperty.numberOfBathrooms}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="propertyType" className="block font-medium text-gray-700">
          Property Type:
        </label>
        <select
          id="propertyType"
          name="propertyType"
          value={updatedProperty.propertyType}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Property Type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
          {/* Add more property type options as needed */}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditPropertyForm;