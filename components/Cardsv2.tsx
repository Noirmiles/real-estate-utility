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

import "./ui/images.css"

import Link from 'next/link';
import Image from 'next/image'

export default function Cards(){
return (

<div className=" gap-4 flex px-3 py-3">
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
      {/*}
      <b className="bdr-css" >
        4 
      </b>
      <b className="bthr-css" >
        3 
      </b>
      <b className="sqrft-css" >
        3 
      </b>
    */}
    </div>
  </CardFooter>
  </Card>
  </div>
  </Link>

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
      {/*}
      <b className="bdr-css" >
        4 
      </b>
      <b className="bthr-css" >
        3 
      </b>
      <b className="sqrft-css" >
        3 
      </b>
    */}
    </div>
  </CardFooter>
  </Card>
  </div>
  </Link>
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
      {/*}
      <b className="bdr-css" >
        4 
      </b>
      <b className="bthr-css" >
        3 
      </b>
      <b className="sqrft-css" >
        3 
      </b>
    */}
    </div>
  </CardFooter>
  </Card>
  </div>
  </Link>

  

</div>
    
    )
}