import {Button} from "@/components/ui/button"
import Cards from '@/components/Cards';
import SearchBar from '@/components/searchBar';

import Background from '@/components/background';

export default function Home() {
  return (
    <div>
      <div className="p-10 text-white text-xl font-bold text-center ">
            Agents. Tours. Homes.
        </div>
      <Background/>

      <main className="m-2 p-8 px-36 items-center">
        <SearchBar/>

      </main>

        <section className= "py-8 flex flex-col items-center text-center gap-8">
          <div className="flex gap-6 py-6"/>
        </section>

    </div>
  );
}
