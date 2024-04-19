// Cardsv2.tsx
import React, { useEffect, useState } from 'react';
import PropertyDetailsModal from './PropertyDetailsModal';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
interface Listing {
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

const prisma = new PrismaClient();

const Cardsv2 = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/houses/listings');
        const data: Listing[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

  const handleOpenModal = (property: Listing) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleOpenModal(listing)}
        >
          {listing.images.length > 0 && (
            <Image
              src={`/images/${listing.images[0]}`}
              alt={`Listing ${listing.id}`}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{listing.address}</h3>
            <p className="text-gray-600">
              {listing.city}, {listing.state}
            </p>
            <p className="text-gray-800 font-semibold mt-2">
              ${listing.listPrice}
            </p>
            {/* Add more listing details as needed */}
          </div>
        </div>
      ))}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Cardsv2;