import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import PropertyDetailsModal from './PropertyDetailsModal';
import { Link } from 'react-router-dom'; // Import Link for dynamic routing


import star1 from "@/public/utility-imgs/star.svg"
import star2 from "@/public/utility-imgs/star-half-fill.svg"
import star3 from "@/public/utility-imgs/star-no-fill.svg"


import "./card.css"

import { Decimal, JsonValue } from '@prisma/client/runtime/library';
import { numberWithCommas } from './numberWithCommas'; // Assuming your function is in a separate file


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Label } from "@/components/ui/label"
import PropertyCard from '@/components/PropertyCard';




const prisma = new PrismaClient();

interface Listing {
  id: number;
  listPrice: Decimal;
  state: string;
  city: string;
  address: string;
  zipcode: number;
  squareFootage: Decimal;
  numberOfRooms: number;
  numberOfBathrooms: number;
  propertyType: string;
  agentName: string;
  agencyName: string;
  images: JsonValue;
  description: string;
  viewCount: number;
  subdivision: string;

}
const console = global.console


const CardList = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  const handleOpenModal = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    setIsModalOpen(true);
  };
  const [listings, setListings] = useState<Listing[]>([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };



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

  const handleCloseModal = () => {
    setSelectedPropertyId(null);
    setIsModalOpen(false);
  };







  return (


    <div className="container px-4">
      <Carousel>
        <CarouselContent className="grid grid-flow-col gap-x-72">
          {listings &&
            listings.map((property) => (
              <CarouselItem className="p-8">
                {/*Need this to open up a card with all the info like on zillow*/}
                <div className="" onClick={() => { console.log('Span clicked!') }}>
                  <div className="card drop-shadow-md">
                    <Image
                      className="object-cover"
                      alt=""
                      src={`/houses/${property.id}/${property.id}-1.webp`}
                      quality={100}
                      width={300}
                      height={300}

                    />
                    {/*Badges*/}
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="badge">{property.propertyType}</span>
                        <span className="badge">{property.subdivision}</span>

                      </div>




                      {/*Price*/}
                      <div>
                        <span className="text-xl font-bold">
                          ${numberWithCommas(property.listPrice)}
                        </span>

                        {/*Product Title*/}
                        <h2 className="product-address" >
                          {property.address}, {property.city}, {property.state}, {property.zipcode}
                        </h2>
                        
                        {/*More Info*/}

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm opacity-50">
                            {property.numberOfRooms} Rooms | {property.numberOfBathrooms} Bathrooms | {property.squareFootage.toString()} SqFt.
                          </span>

                        </div>

                      </div>
                      <Label onClick={() => handleOpenModal(property.id)} className="cursor-pointer rounded bg-black p-2 text-white active:bg-slate-400">
                        View
                      </Label>


                    </div >
                  </div >
                </div>
              </CarouselItem>
            )
            )
          }  </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>


  );
};

export default CardList;

