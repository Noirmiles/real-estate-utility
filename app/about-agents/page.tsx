import Wave from "@/components/Wave";
import React from "react";
import EmailLink from "./EmailLink";

export default function Home() {

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black">
      <div className="bg-gradient-to-r from-gray-900 to-black ">
        <div className="text-white text-4xl font-bold text-center font-serif p-24">
          Our Agents
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* Agency 1: Premier Homes */}
          <div className="text-center bg-white rounded-lg shadow-md p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-t-lg"></div>
            <h2 className="text-2xl font-bold mb-4">Premier Homes</h2>
            
            {/* Bio of First Agent (Cady Harris) */}
            <div className="profile-container mb-8">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <img
                  src="https://i.pinimg.com/originals/5f/fb/7f/5ffb7f89613d60bc194491716c3e3755.jpg"
                  alt="Cady Harris"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Cady Harris</h2>
              <p className="text-gray-600 mb-1">Hometown: Birmingham, AL</p>
              <p className="text-gray-600 mb-1">Dedication, expertise, and a passion for finding your perfect home.</p>
              <p className="text-gray-600 font-bold mb-1">21 Homes Sold</p>
              <p className="text-gray-600 break-words">
                Email: <EmailLink email="cadyharrissellls@gmail.com" />
              </p>
            </div>

            {/* Bio of Second Agent (Brad Brown) */}
            <div className="profile-container">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <img
                  src="https://i.pinimg.com/originals/90/c0/51/90c051810494297069df2b6b9a450c15.jpg"
                  alt="Brad Brown"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                  style={{ objectPosition: '0 -3px' }}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Brad Brown</h2>
              <p className="text-gray-600 mb-1">Hometown: Tampa, FL</p>
              <p className="text-gray-600 mb-1">Exceeding your expectations, one home at a time.</p>
              <p className="text-gray-600 font-bold mb-1">11 Homes Sold</p>
              <p className="text-gray-600 break-words">
                Email: <EmailLink email="bradbrownhomes@gmail.com" />
              </p>
            </div>
          </div>

          {/* Agency 2: Luxury Living */}
          <div className="text-center bg-white rounded-lg shadow-md p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-t-lg"></div>
            <h2 className="text-2xl font-bold mb-4">Luxury Living</h2>
            {/* Bio of Third Agent (Susan Bates) */}
            <div className="profile-container mb-8">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <img
                  src="https://i.pinimg.com/originals/e3/73/6e/e3736ec197e941eda6d63c4a9234ea15.jpg"
                  alt="Susan Bates"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                  style={{ objectPosition: '0 -3px' }}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Susan Bates</h2>
              <p className="text-gray-600 mb-1">Hometown: New York City, NY</p>
              <p className="text-gray-600 mb-1">Unmatched market knowledge and a commitment to your success.</p>
              <p className="text-gray-600 font-bold mb-1">51 Homes Sold</p>
              <p className="text-gray-600 break-words">
                Email: <EmailLink email="susanbateshomes@gmail.com" />
              </p>
            </div>

            {/* Bio of Fourth Agent (Lucas Thomas) */}
            <div className="profile-container">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <img
                  src="https://getgoodhead.com/wp-content/uploads/2018/04/Collin-Wasiak-.jpg"
                  alt="Lucas Thomas"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                  style={{ objectPosition: '0 -5px' }}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Lucas Thomas</h2>
              <p className="text-gray-600 mb-1">Hometown: Huntsville, AL</p>
              <p className="text-gray-600 mb-1">Guiding you home with integrity and professionalism.</p>
              <p className="text-gray-600 font-bold mb-1">68 Homes Sold</p>
              <p className="text-gray-600 break-words">
                Email: <EmailLink email="lucasthomas@gmail.com" />
              </p>
            </div>
          </div>

          {/* Agency 3: Prestige Properties */}
          <div className="text-center bg-white rounded-lg shadow-md p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-t-lg"></div>
            <h2 className="text-2xl font-bold mb-4">Prestige Properties</h2>
            {/* Bio of Fifth Agent (Becca Lisa) */}
            <div className="profile-container mb-8">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <img
                  src="https://i.pinimg.com/736x/12/90/b0/1290b009c10a37259ad562b0bcf4d4f8.jpg"
                  alt="Becca Lisa"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                  style={{ objectPosition: '0 -5px' }}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Becca Lisa</h2>
              <p className="text-gray-600 mb-1">Hometown: Los Angeles, CA</p>
              <p className="text-gray-600 mb-1">Turning your real estate dreams into reality.</p>
              <p className="text-gray-600 font-bold mb-1">38 Homes Sold</p>
              <p className="text-gray-600 break-words">
                Email: <EmailLink email="beccalisahomes@gmail.com" />
              </p>
            </div>

            {/* Bio of Sixth Agent (Kim Thompkins) */}
            <div className="profile-container">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <img
                  src="https://www.avisonyoung.us/documents/92502/649587/Madison%2C+Lindsey.jpg/f2d3d6b6-5ba8-45a8-9126-65a2a0b2e130?t=-1465624201"
                  alt="Kim Thompkins"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-full"
                  style={{ objectPosition: '0 -7px' }}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Kim Thompkins</h2>
              <p className="text-gray-600 mb-1">Hometown: Boston, MA</p>
              <p className="text-gray-600 mb-1">Experience, trust, and personalized service for all your real estate needs.</p>
              <p className="text-gray-600 font-bold mb-1">55 Homes Sold</p>
              <p className="text-gray-600 break-words">
                Email: <EmailLink email="kimthompkinshomes@gmail.com" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the code remains the same */}
    </div>
  );
}