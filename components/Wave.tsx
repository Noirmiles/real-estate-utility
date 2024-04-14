"use client"

import slide_image_1 from './images/img_1.jpg';
import slide_image_2 from './images/img_2.jpg';
import slide_image_3 from './images/img_3.jpg';
import slide_image_4 from './images/img_4.jpg';
import slide_image_5 from './images/img_5.jpg';
import slide_image_6 from './images/img_6.jpg';
import slide_image_7 from './images/img_7.jpg';

import "./wave.css"
import Link from 'next/link';
import Image from 'next/image'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IonIcon } from '@ionic/react';
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';





export default function Wave(){
return (

    <div className="">
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container"
    >



      <SwiperSlide>
        <Image src={slide_image_1} alt="slide_image" /> 
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide_image_2} alt="slide_image" /> 
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide_image_3} alt="slide_image"  /> 
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide_image_4} alt="slide_image"/> 
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide_image_5} alt="slide_image"  /> 
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide_image_6} alt="slide_image"  /> 
      </SwiperSlide>
      <SwiperSlide>
        <Image src={slide_image_7} alt="slide_image" /> 
      </SwiperSlide>

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <IonIcon name="arrow-back-outline"></IonIcon>
        </div>
        <div className="swiper-button-next slider-arrow">
          <IonIcon name="arrow-forward-outline"></IonIcon>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  </div>
    
    )
}