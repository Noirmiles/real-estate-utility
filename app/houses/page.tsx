import {Button} from "@/components/ui/button"
import Cardsv2 from '@/components/Cardsv2';
import SearchBar from '@/components/searchBar';

import Background from '@/components/background';
import SearchMenu from '@/components/SearchMenu';

export default function Houses() {
  return (
    <div>
      {/*<Background/> */}
        <div className="flex items-center h-16 p-6">
          <div className="flex-shrink-0">
            <a className="text-white text-xl font-bold text-center drop-shadow-lg">
              Real Estate & Homes For Sale
            </a>
          </div>
        </div>
        <div className="p-5 flex">
          <SearchBar/>
          <SearchMenu/>


        </div>
        
      
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(12,198,43,0.3),rgba(255,245,230,60))]">
        </div>
      
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>

      <div className="px-5 ">
        <Cardsv2/>
        <Cardsv2/>
      </div>
  </div>
  );
}
