import {Button} from "@/components/ui/button"
import Navbar from '@/components/Navbar';
import Background from '@/components/background';

export default function Home() {
  return (
    <main className="p-24">
      <Navbar/>
      <Background/>
      <section className= "py-24 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold"> Project Z</h1>

        <div className="rounded-med bg-gray-200 px-4 py-2 text-black">
            <p className="text-2xl">  Testing some styling options</p>
        </div>
        
        <div className="flex gap-6 py-6"/>
      </section>
      <div className="flex gap-6 py-6 items-center justify-center">
        <Button> Button 1</Button>
        <Button> Button 2</Button>
      </div>
    </main>
  );
}
