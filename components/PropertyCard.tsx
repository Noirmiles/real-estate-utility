import React, { useState, useEffect } from 'react';
import { PrismaClient, Property } from '@prisma/client';
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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel } from "@/components/ui/dropdown-menu"; // Assuming this is the path to your Shadcn UI components
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"


const prisma = new PrismaClient();

interface ListingID {
  id: number;
}


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



const PropertyCard = (props: ListingID) => {
  const listingId = props.id;

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [listings, setListings] = useState<Listing[]>([]);


  const formStyle = {
    margin: 'auto',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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


  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/houses/listings/${listingId}`);
        const data: Listing[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListing();
  }, [listingId]);


  return (

    <div className="">
      <div className="">
        {listings &&
          listings.map((property) => (
            <ScrollArea className="rounded-md fixed top-36 left-0 items-center justify-center h-[500px] w-[500px]" style={formStyle}>
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
                              src={`/houses/18/18-${index + 1}.webp`}
                              quality={100}
                              width={500}
                              height={500}

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
                    <div className=" pt-8 font-bold">
                      Description:
                    </div>
                    <h2 className="flex text-sm ">
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

                </div >
              </div >

            </ScrollArea>))};

      </div>
    </div>


  );
};

export default PropertyCard;
