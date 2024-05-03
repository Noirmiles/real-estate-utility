import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import PropertyDetailsModal from './PropertyDetailsModal';
import { Link } from 'react-router-dom'; // Import Link for dynamic routing


import star1 from "@/public/utility-imgs/star.svg"
import star2 from "@/public/utility-imgs/star-half-fill.svg"
import star3 from "@/public/utility-imgs/star-no-fill.svg"

import home1 from "@/public/houses/18/18-1.webp"

import "./card.css"

import { Decimal, JsonValue } from '@prisma/client/runtime/library';
import { numberWithCommas } from './numberWithCommas'; // Assuming your function is in a separate file
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,

} from "@/components/ui/carousel"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";

import { getCurrentUser } from "@/app/services/auth.service";
import { IUser } from "@/app/types/user-types";





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
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)


//Edit Listing
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    setUser(getCurrentUser()); //  getCurrentUser() fetches the logged-in user's details
  }, []);


  const isAgent = user && user.role.name === "agent";
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEdit = () => {
    setIsEditOpen(!isEditOpen);
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="flex justify-center">
      <div>
        <div className="grid grid-cols-2 grid-flow-rows gap-y-4 gap-x-4"> {/* Set 2 columns */}
          {listings &&
            listings.map((property, index) => (
              <span>
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
                        {property.address}, {property.city}, {property.state},{" "}
                        {property.zipcode}
                      </h2>
                      {/*More Info*/}

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm opacity-50">
                          {property.numberOfRooms} Rooms |{" "}
                          {property.numberOfBathrooms} Bathrooms |{" "}
                          {property.squareFootage.toString()} SqFt.
                        </span>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger>Open</DialogTrigger>
                      <DialogContent>
                        <ScrollArea className=" rounded-md h-[500px]">
                          <div className="card-large rounded-md">
                            <div>
                              <Carousel setApi={setApi} >

                                <CarouselContent className=" ">
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                      <div className="">

                                        <Image
                                          className="rounded-lg"
                                          alt=""
                                          src={`/houses/${property.id}/${property.id}-${index + 1}.webp`}
                                          quality={100}
                                          width={500}
                                          height={400}

                                        />

                                      </div>
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselNext />
                                <CarouselPrevious />


                              </Carousel>
                              <div className=" mt-2 text-center text-sm text-muted-foreground">
                                Slide {current} of {count}
                              </div>
                            </div>



                            <div className=" flex flex-col gap-3">
                              <div className="flex items-center gap-2">
                                <span className="badge">{property.propertyType}</span>

                              </div>

                              {/*Price*/}
                              <div>
                                <span className="text-xl font-bold">
                                  ${numberWithCommas(property.listPrice)}
                                </span>

                                {/*Product Title*/}
                                <h2 className="product-address" title="">
                                  {property.address}, {property.city}, {property.state}, {property.zipcode}
                                </h2>
                                <h3 className="product-address">
                                  {property.subdivision}
                                </h3>
                                {/*More Info*/}

                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm opacity-50">
                                    {property.numberOfRooms} Rooms | {property.numberOfBathrooms} Bathrooms | {property.squareFootage.toString()} SqFt.
                                  </span>

                                </div>
                                <div className=" pt-8 font-bold overflow-y-auto">
                                  Description:
                                </div>
                                <h2 className="flex text-sm flex-wrap">
                                  {property.description}
                                </h2>

                              </div>

                              {/*Agent Review should only be seen by Agent*/}
                              <div>
                                <span className="flex items-center mt-1 font-extralight mb-8">
                                  Agency Rating:
                                  <Image src={star1} alt="" />
                                  <Image src={star1} alt="" />
                                  <Image src={star1} alt="" />
                                  <Image src={star2} alt="" />
                                  <Image src={star3} alt="" />
                                </span>
                              </div>




                              <div>
                                <span className="flex text-right mt-1 font-regular mb-8">
                                  Views: {property.viewCount}
                                </span>
                              </div>

                              {isAgent && (
                                <>
                                  <div className=" font-bold overflow-y-auto pt-4">
                                    Agent Tools:
                                    <div className="font-light">
                                      Alarm Code: {property.alarmCode}
                                    </div>
                                  </div>

                                </>

                              )}

                            </div >
                          </div >

                        </ScrollArea>

                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </span>

            )
            )
          }  </div>
      </div>
    </div>


  );
};

export default CardList;
