import {Button} from "@/components/ui/button"
import Cards from '@/components/Cards';
import SearchBar from '@/components/searchBar';

import Background from '@/components/background';

export default function Home() {
  return (
    <div>
      <Background/>

      <main className="p-20">
        <SearchBar/>        
        <section className= "py-8 flex flex-col items-center text-center gap-8">
          <div className="flex gap-6 py-6"/>
        </section>
        <div className="flex gap-6 py-6 ">
          <Cards/>
        </div>
      </main>
    </div>
  );
}
