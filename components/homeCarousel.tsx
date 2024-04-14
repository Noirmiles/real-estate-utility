import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import Cardsv2 from "@/components/Cardsv2"

export default function HomeCarousel(){
    return (

<div>
  <Carousel>
    <CarouselContent>
    <CarouselItem> <Cardsv2/></CarouselItem>
      <CarouselItem> <Cardsv2/></CarouselItem>
      <CarouselItem> <Cardsv2/></CarouselItem>
    </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
</div>
    )
}

  