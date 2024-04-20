"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/cardv2"

import home1 from "@/public/home1.jpg"

import "./card.css"

import Link from 'next/link';
import Image from 'next/image'

import star1 from "@/public/utility-imgs/star.svg"
import star2 from "@/public/utility-imgs/star-half-fill.svg"
import star3 from "@/public/utility-imgs/star-no-fill.svg"





export default function Cards() {
  return (

    <div className="card">
      <Image className="object-cover"
        alt="home1"
        src={home1}
        placeholder="blur"
        quality={100}
        width={300}
        height={100}
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

          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm  opacity-50">
              Status:
            </span>
            <span className="discount-percent">
              For Sale
            </span>
          </div>
        </div>

        {/*Agent Review*/}
        <div>
          <span className="flex items-center mt-1 font-extralight">
            Agent Rating:
            <Image src={star1} alt=""/>
            <Image src={star1} alt=""/>
            <Image src={star1} alt=""/>
            <Image src={star2} alt=""/>
            <Image src={star3} alt=""/>
          </span>
        </div>
      </div>
    </div>

  )
}

{/*<div className=" gap-4 flex px-3 py-3">
  <Link href= "/app/pages/page2.tsx">
  <Image className = "rounded-image"
                alt="home1"
                src={home1}
                placeholder="blur"
                quality={100}
                width={300}
                height={150}
                style={{ marginBottom: "-5px",
                      zIndex: "-1"}}
    />
  <div className= "card-css">
  <Card className= "col-3 col-md-6">
  <CardFooter>
    <div className="flex p-2">
      <b className="price-css" >
        $400,000 
      </b>
      
  
    
    </div>
  </CardFooter>
  </Card>
  </div>
  </Link>

 

  

</div>
    
    )
}*/}