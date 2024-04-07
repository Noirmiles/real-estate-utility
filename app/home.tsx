import {Button} from "@/components/ui/button"
import Cards from '@/components/Cards';
import SearchBar from '@/components/searchBar';

import Background from '@/components/background';

export default function Home() {

  const formStyle = {
    margin: 'auto',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
    marginTop: '250px',
  };  

  return (
    <div>
      <div className="p-10 py-20 text-white text-3xl font-bold text-center font-serif ">
            Agents. Tours. Homes.
        </div>
      <Background/>

      <main className="m-2 p-8 px-36 items-center">
        <SearchBar/>
      </main>

      <div style={formStyle}>


        <section className= " flex flex-col items-center text-center gap-8">
          <div className="flex gap-6 py-6"/>
        </section>
      </div>

    </div>
  );
}
