import CardList from '@/components/CardCarousel_Large';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const BuyColumn = () => {

  const formStyle = {
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: '',
  };

  return (
    <div className="mb-20">

      {/* White rectangle */}
      <div className="" style={formStyle} >
        <ScrollArea className="h-screen w-50vw">
          <CardList />
          <Separator className="my-2 mx-5" />
          <footer className="text-center mt-8 p-3 text-white">
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default BuyColumn;
