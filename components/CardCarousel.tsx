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
import { Button } from "@/components/ui/button";





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
  alarmCode: number;



}







const CardList = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const handleOpenModal = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    setIsModalOpen(true);
  };
  const [listings, setListings] = useState<Listing[]>([]);





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

  const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const handleOpenModal = (property) => {
    setSelectedPropertyId(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPropertyId(null); // Reset selected ID
  };

  return (
    <> 
      {/* Inside your CarouselItem, add a button or element
          to trigger the modal using handleOpenModal */}

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen ..."> {/* Modal Styling */}
          <PropertyCard listingID={selectedPropertyId} />
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </>
  );
};






  return (


    <div className="container px-4">
      <Carousel>
        <CarouselContent className="grid grid-flow-col gap-x-72">
          {listings &&
            listings.map((property) => (
              <CarouselItem className="p-8">
                {/*Need this to open up a card with all the info like on zillow*/}
                <div className="card w-72 min-h-[10rem] drop-shadow-md">
                  <Image
                    className="object-cover"
                    alt="{"
                    src={`/houses/${property.id}/${property.id}-1.webp`}
                    quality={100}
                    width={320}
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
                      <h2 className="product-address" title="Jamaican Condo">
                        {property.address}, {property.city}, {property.state}, {property.zipcode}
                      </h2>
                      {/*More Info*/}

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm opacity-50">
                          {property.numberOfRooms} Rooms | {property.numberOfBathrooms} Bathrooms | {property.squareFootage.toString()} SqFt.
                        </span>

                      </div>

                    </div>

                    <Button onClick={toggleModal} className="bg-slate-700 rounded-lg p-3 text-white hover:bg-slate-500">
                      <span className="flex justify-between">
                        View

                      </span>
                    </Button>
                  </div >

                </div >

              </CarouselItem>
            )
            )
          }
          <CarouselItem className="p-8">
            {/*Need this to open up a card with all the info like on zillow*/}
            <a href="/houses">
              <div className="card  min-w-[30rem] min-h-[25rem] drop-shadow-md">

                {/*Badges*/}
                <div className="flex justify-center">
                  <Button onClick={toggleModal} className="bg-slate-700 rounded-lg p-3 text-white hover:bg-slate-500">
                    <span className="flex justify-between">
                      See More

                    </span>
                  </Button>
                </div >
              </div>
            </a>

          </CarouselItem>


        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div >


  );
};

export default CardList;

