"use client"

import home1 from "@/public/home1.jpg"

import "./card.css"

import Link from 'next/link';

import star1 from "@/public/utility-imgs/star.svg"
import star2 from "@/public/utility-imgs/star-half-fill.svg"
import star3 from "@/public/utility-imgs/star-no-fill.svg"

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

const Card = () => {
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

  const handleDeleteProperty = async (propertyId: number) => {
    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted property from the listings state
        setListings((prevListings) =>
          prevListings.filter((listing) => listing.id !== propertyId)
        );
      } else {
        console.error('Error deleting property:', response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      // Handle the error, show an error message, etc.
    }
  };


  return (
    <a href="/" className= "">

    <div className="card">
      <Image className="object-cover"
        alt="home1"
        src={home1}
        placeholder="blur"
        quality={100}
        width={300}
        height={300}
        style={{
          marginBottom: "-5px",
        }}
      />
      {/*Badges*/}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="badge">For Sale</span>
          <span className="badge">Mansion</span>
        </div>




        {/*Price*/}
        <div>
          <span className="text-xl font-bold">
            $720,00

          </span>

          {/*Product Title*/}
          <h2 className="product-address" title="Jamaican Condo">
            7871 Moores Mill Rd, Meridianville, AL, 34659
          </h2>
          {/*More Info*/}

          {listings.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
          <span className="text-sm opacity-50">
            {listings.map((listing) => (
              <span key={listing.id}>
                {listing.numberOfRooms} Rooms | {listing.numberOfBathrooms} Bathrooms | {listing.squareFootage} sqFt.
              </span>
            ))}
          </span>
          <span className="discount-percent">
            For Sale
          </span>
        </div>
    )}
      </div>

      {/*Agent Review*/}
      <div>
        <span className="flex items-center mt-1 font-extralight">
          Agent Rating:
          <Image src={star1} alt="" />
          <Image src={star1} alt="" />
          <Image src={star1} alt="" />
          <Image src={star2} alt="" />
          <Image src={star3} alt="" />
        </span>
      </div>
    </div >
    </div >
    </a>

  )
};

export default Card;