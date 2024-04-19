import Wave from "@/components/Wave";
import React from "react";

export default function Home() {
  const formStyle = {
    margin: "auto",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0)",
    marginTop: "250px",
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="text-white text-4xl font-bold text-center font-serif mb-10">
          Our Agents
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
  {/* Bio of First Agent (Cady Harris) */}
  <div className="profile-container text-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
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
    <p className="text-gray-600 font-bold mb-1">21 Homes Sold!!!</p>
    <p className="text-gray-600 break-words">Email: cadyharrissellls@gmail.com</p>
  </div>

  {/* Bio of Second Agent (Brad Brown) */}
  <div className="profile-container text-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
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
    <p className="text-gray-600 font-bold mb-1">11 Homes Sold!!!</p>
    <p className="text-gray-600 break-words">Email: bradbrownwins@aol.com</p>
  </div>

  {/* Bio of Third Agent (Susan Bates) */}
  <div className="profile-container text-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
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
    <p className="text-gray-600 break-words">Email: susanbates@yahoo.com</p>
  </div>

  {/* Bio of Fourth Agent (Lucas Thomas) */}
<div className="profile-container text-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
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
  <p className="text-gray-600 font-bold mb-1">68 Homes Sold!!!</p>
  <p className="text-gray-600 break-words">Email: lucasthomas@aol.com</p>
</div>

  {/* Bio of Fifth Agent (Becca Lisa) */}
  <div className="profile-container text-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
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
    <p className="text-gray-600 font-bold mb-1">38 Homes Sold!!!</p>
    <p className="text-gray-600 break-words">Email: beccalisaisit@gmail.com</p>
  </div>

  {/* Bio of Sixth Agent (Kim Thompkins) */}
  <div className="profile-container text-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
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
    <p className="text-gray-600 font-bold mb-1">55 Homes Sold!!!</p>
    <p className="text-gray-600 break-words">Email: kimthompkinssellshomes@aol.com</p>
  </div>
</div>
      </div>

      <div style={formStyle}>
        {/* Real Estate Gif */}
        <div className="flex justify-center mb-10">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXJiczN3MjNxYnJjdnk4d21zNW5zOWZ6ajljejZyajQ3N3Z5aXNhdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TLCpf8koMoNEWkToQD/giphy.gif"
            alt="House GIF"
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-4">Trending Homes on Project Z</h2>
            <p className="text-lg text-gray-600">
              Viewed and saved the most in the area over the last 24 hours
            </p>
            {/* Add trending homes carousel or grid */}
          </section>

          <Wave />

          <footer className="text-center py-10 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Project Z Group is committed to ensuring digital accessibility for individuals with
              disabilities. We are continuously working to improve the accessibility of our web
              experience for everyone, and we welcome feedback and accommodation requests. If you
              wish to report an issue or seek an accommodation, please let us know.
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Project Z Inc. holds real estate brokerage licenses in multiple states. Project Z
              (USA), Inc. holds real estate brokerage licenses in multiple provinces.
            </p>
            <p className="text-sm text-gray-600 mb-2">§ 442-H New York Standard Operating Procedures</p>
            <p className="text-sm text-gray-600 mb-2">§ New York Fair Housing Notice</p>
            <p className="text-sm text-gray-600 mb-2">
              TREC: Information about brokerage services, Consumer protection notice
            </p>
            <p className="text-sm text-gray-600 mb-8">California DRE #1522444</p>
            <p className="text-lg font-bold mb-8">Contact Project Z, Inc. Brokerage</p>
            <p className="text-sm text-gray-600 mb-8">
              For listings in USA, the trademarks REALTOR®, REALTORS®, and the REALTOR® logo are
              controlled by The USA Real Estate Association (CREA) and identify real estate
              professionals who are members of CREA. The trademarks MLS®, Multiple Listing Service®
              and the associated logos are owned by CREA and identify the quality of services
              provided by real estate professionals who are members of CREA. Used under license.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Download on the App Store">
                <img
                  src="https://s.zillowstatic.com/pfs/static/app-store-badge.svg"
                  alt="App store logo"
                  height="32"
                  width="96"
                  title="Download on the App Store"
                  loading="lazy"
                />
              </a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Download on the App Store">
                <img
                  src="https://s.zillowstatic.com/pfs/static/google-play-badge.svg"
                  alt="Google play logo"
                  height="32"
                  width="108"
                  title="Get it on Google Play"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}