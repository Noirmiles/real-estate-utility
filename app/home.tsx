"use client"
import { Button } from "@/components/ui/button"
import CardList from '@/components/CardList';
import SearchBar from '@/components/searchBar';

import React, { useState, ReactElement, useEffect, useRef, ChangeEvent, FormEvent, lazy } from 'react';

import Background from '@/components/background';
import Wave from '@/components/Wave';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'


export default function Home() {

  const formStyle = {
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
    marginTop: '650px',
  };

  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term in main page






  return (
    <div className="">

      <Background />

      <Parallax pages={2}>
        <ParallaxLayer speed={1} className="">


          <section className="top-container">

            <div className="p-10 py-20 text-white text-4xl font-bold text-center drop-shadow-xl ">
              Agents. Tours. Homes.
            </div>

            <div className="m-2 p-8 px-36 items-center flex-grow relative">
              <div className="z-10"> 
                <SearchBar/>
              </div>
            </div>


          </section>
        </ParallaxLayer>





        <ParallaxLayer>
          <div style={formStyle} className="bg-gradient-to-r f text-black">

            <div className=" flex flex-col  min-h-screen">
              <section className=" flex flex-col items-left text-left gap-8 p-10">
                <div className="font-bold text-xl ">
                  Trending Homes on Z Real Estate
                  <div className="text-sm font-thin ">
                    Viewed and saved the most in the area over the last 24 hours
                  </div>
                </div>
              </section>

              <div className="flex flex-wrap justify-between m-4 mb-24">
                <CardList />
            
         
              </div>

              <footer className="text-center p-3">
                <div className="text-xs ">
                  Project Z Group is committed to ensuring digital accessibility for individuals with disabilities.
                  We are continuously working to improve the accessibility of our web experience for everyone, and we welcome feedback and accommodation requests.
                  If you wish to report an issue or seek an accommodation, please let us know.
                </div>
                <div className="p-5 text-xs ">Project Z Inc. holds real estate brokerage licenses in multiple states. Project Z (USA), Inc. holds real estate brokerage licenses in multiple provinces.</div>
                <div className="text-xs ">§ 442-H New York Standard Operating Procedures<div />
                  <div className="text-xs ">§ New York Fair Housing Notice</div>
                  <div className="text-xs ">TREC: Information about brokerage services, Consumer protection notice</div>
                  <div className="text-xs ">California DRE #1522444</div>
                </div>

                <div className="p-10 text-base">
                  Contact Project Z, Inc. Brokerage
                </div>

                <div className="text-xs ">
                  For listings in USA, the trademarks REALTOR®, REALTORS®, and the REALTOR® logo are controlled
                  by The USA Real Estate Association (CREA) and identify real estate professionals who are members
                  of CREA. The trademarks MLS®, Multiple Listing Service® and the associated logos are owned by CREA and
                  identify the quality of services provided by real estate professionals who are members of CREA.
                  Used under license.
                </div>

                <div className="flex justify-center space-x-4 m-10">
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Download on the App Store">
                    <img src="https://s.zillowstatic.com/pfs/static/app-store-badge.svg" alt="App store logo" height="32" width="96" title="Download on the App Store" loading="lazy" />
                  </a>

                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Download on the App Store">
                    <img src="https://s.zillowstatic.com/pfs/static/google-play-badge.svg" alt="Google play logo" height="32" width="108" title="Get it on Google Play" loading="lazy" decoding="async"></img>
                  </a>
                </div>

              </footer>


            </div>
          </div>
        </ParallaxLayer>


      </Parallax>

    </div>
  );
}
