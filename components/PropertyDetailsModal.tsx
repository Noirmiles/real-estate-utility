import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { Property } from '@prisma/client';

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
    images: string [];
    createdAt: string;
    updatedAt: string;
  }
  
  interface PropertyDetailsModalProps {
    property: PropertyData;
    isOpen: boolean;
    onClose: () => void;
  }

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Property Details"
      className="fixed inset-0 z-50 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
          <div className="mb-4">
            {Array.isArray(property.images) &&
                property.images.slice(0, 5).map((image, index) => (
                <Image
                    key={`${property.id}-${index}`}
                    src={typeof image === 'string' ? image : (image as { url: string }).url}
                    alt={`Property Image ${index + 1}`}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover mb-2"
                />
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{property.address}</h2>
            <p className="text-gray-600 mb-4">
              {property.city}, {property.state}
            </p>
            <p className="text-gray-800 font-semibold mb-2">
              ${property.listPrice}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Bedrooms:</span>{' '}
              {property.numberOfRooms}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Bathrooms:</span>{' '}
              {property.numberOfBathrooms}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Square Footage:</span>{' '}
              {property.squareFootage}
            </p>
            {/* Add any additional property details here */}
          </div>
        </div>
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PropertyDetailsModal;