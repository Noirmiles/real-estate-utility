"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./ui/card"

import home1 from "@/public/home1.jpg"
import home2 from "@/public/home2.jpg"
import home3 from "@/public/home3.jpg"

import Link from 'next/link';
import Image from 'next/image'

export default function Cards(){
return (

<div className=" gap-4 flex">
  <Link href= "/app/pages/page2.tsx">
  <Card className= "col-3 col-md-6">
  <CardHeader>
    <CardTitle>Kendrick Colonial</CardTitle>
    <CardDescription>California</CardDescription>
  </CardHeader>
  <CardContent>
  <Image
                alt="home1"
                src={home1}
                placeholder="blur"
                quality={100}
                width={200}
                height={150}
                
  />
  </CardContent>
  <CardFooter>
    <p>$400,000 </p>
    <p> -House for Sale</p>
  </CardFooter>
  </Card>
  </Link>

  <Link href="./pages/page3.tsx">
  <Card className= "col-3 col-md-6">
<CardHeader>
  <CardTitle>Luxury Sampha</CardTitle>
  <CardDescription>England</CardDescription>
</CardHeader>
<CardContent>
<Image
              alt="home2"
              src={home2}
              placeholder="blur"
              quality={100}
              width={200}
              height={150}
              
/>
</CardContent>
<CardFooter>
  <p>$300,000 </p>
  <p> -House for Sale</p>
</CardFooter>
</Card>
</Link>

<Link href="/page4.tsx">
<Card className= "col-3 col-md-6">
<CardHeader>
  <CardTitle>Midwest B. Marley</CardTitle>
  <CardDescription>Jamaica</CardDescription>
</CardHeader>
<CardContent>
<Image
              alt="home3"
              src={home3}
              placeholder="blur"
              quality={100}
              width={200}
              height={150}
              
/>
</CardContent>
<CardFooter>
  <p>$270,000 </p>
  <p> -House for Rent</p>
</CardFooter>
</Card>
</Link>



</div>
    
    )
}