"use client"

import slide_image_1 from '@/public/Zest-Banner_1-2560-1440.png';
import slide_image_2 from '@/public/Zest-Banner_2-2560-1440.png';
import slide_image_3 from '@/public/Zest-Banner_3-2560-1440.png';


import Link from 'next/link';
import Image from 'next/image'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IonIcon } from '@ionic/react';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';





export default function Wave() {
  const imageStyle = {
    width: '100%', 
    height: 'auto',

  };
  return (
    <div className="flex mx-auto max-w-4xl">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        spaceBetween={0}
        coverflowEffect={{

        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Pagination, Navigation]} className="swiper_container"
        autoplay={{
          delay: 200, // Set autoplay delay (in milliseconds)
          disableOnInteraction: false, // Allow autoplay to resume on interaction
        }}
      >
        <SwiperSlide>
          <Image src={slide_image_1} alt="slide_image" style={imageStyle} loading="lazy" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide_image_2} alt="slide_image" style={imageStyle} loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={slide_image_3} alt="slide_image" style={imageStyle} loading="lazy"/>
        </SwiperSlide>

      </Swiper>

    

      </div>

      )
}