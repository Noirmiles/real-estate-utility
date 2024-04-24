import React, { useState, useEffect } from 'react';
import Card from './Card'; // Import your Card component
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import PropertyDetailsModal from './PropertyDetailsModal';

import star1 from "@/public/utility-imgs/star.svg"
import star2 from "@/public/utility-imgs/star-half-fill.svg"
import star3 from "@/public/utility-imgs/star-no-fill.svg"

import home1 from "@/public/home1.jpg"

import "./card.css"

import Link from 'next/link';
import { Decimal, JsonValue } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

interface Listing {
  id: number;
  listPrice:  Decimal;
  state: string;
  city: string;
  address: string;
  squareFootage:  Decimal;
  numberOfRooms: number;
  numberOfBathrooms: number;
  propertyType: string;
  images:  JsonValue;

}

const CardList = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const properties = await prisma.property.findMany();
        setListings(properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {listings &&
        listings.map((property) => (
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
        </div>




        {/*Price*/}
        <div>
          <span className="text-xl font-bold">
            ${property.listPrice.toString()}

          </span>

          {/*Product Title*/}
          <h2 className="product-address" title="Jamaican Condo">
            {property.address}, {property.city}, {property.state}, ZIPCODE
          </h2>
          {/*More Info*/}

          <div className="flex items-center gap-2 mt-1">
          <span className="text-sm opacity-50">
                {property.numberOfRooms} Rooms | {property.numberOfBathrooms} Bathrooms | {property.squareFootage.toString()} sqFt.
          </span>
          <span className="badge-details">
            For Sale
          </span>
          <span className="badge-details">
            {property.propertyType}
          </span>
        </div>
    
      </div>

      {/*Agent Review*/}
      <div>
        <span className="flex items-center mt-1 font-extralight">
          {/*property.agencyName} Rating:*/}
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
          ))}
    </div>
  );
};

export default CardList;

