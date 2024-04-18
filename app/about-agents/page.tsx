import Wave from "@/components/Wave";
import React from "react";


export default function Home() {

  const formStyle = {
    margin: 'auto',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)', 
    marginTop: '250px',
  };  

  return (
    <div>
     <div style={{ backgroundColor: 'black'}}></div>
      <div className="p-10 py-20 text-black text-3xl font-bold text-center font-serif ">
            Our Agents.
        </div>

     
      <div className="black-background">
      {/* Content of your component */}
    </div>
    




      
      <div className="flex justify-center text-black font-serif text-center"  >
        
      

      {/*//Bio of First Agent (Cady Harris)*/}

      <div className="profile-container text-underline">
      <img src="https://i.pinimg.com/originals/5f/fb/7f/5ffb7f89613d60bc194491716c3e3755.jpg" width="200" height="200" alt="Description of image" />
      <h2>Cady Harris</h2>
      <p>Hometown: Birmingham, AL</p>
      <p>Motto: I strive to be great!</p>
      <p>21 Homes Sold!!! </p>
      <p>Email: cadyharrissellls@gmail.com</p>
    </div>


      {/*//Bio of Second Agent (Brad Brown)*/}

      <div className="profile-container">
            <img src="https://i.pinimg.com/originals/90/c0/51/90c051810494297069df2b6b9a450c15.jpg" width="200" height="200" alt="Description of image"  />
            <h2>Brad Brown</h2>
            <p>Hometown: Tampa, FL</p>
            <p>Motto: I will win you over!</p>
            <p>11 Homes Sold!!! </p>
            <p>Email: bradbrownwins@aol.com</p>
          </div>

     {/* //Bio of Third Agent (Susan Bates) */}

      <div className="profile-container">
      <span style={{ float: 'right', marginRight: '10px' }}></span>
      <img src="https://i.pinimg.com/originals/e3/73/6e/e3736ec197e941eda6d63c4a9234ea15.jpg" width="200" height="200" alt="Description of image" />
      <h2>Susan Bates</h2>
      <p>Hometown: New York City, NY</p>
      <p>Motto: I am the best seller!!!!</p>
      <p>51 Homes Sold!!! </p>
      <p>Email: susanbates@yahoo.com</p>
    </div>

    {/* //Bio of Fourth Agent (Lucas Thomas) */}

    <div className="profile-container">
      <span style={{ float: 'right', marginRight: '10px' }}></span>
      <img src="https://getgoodhead.com/wp-content/uploads/2018/04/Collin-Wasiak-.jpg" width="200" height="200" alt="Description of image" />
      <h2>Lucas Thomas</h2>
      <p>Hometown: Huntsville, AL</p>
      <p>Motto: I want what's best for you!</p>
      <p>68 Homes Sold!!! </p>
      <p>Email: lucasthomas@aol.com</p>
    </div>

      {/* //Bio of Fifth Agent (Becca Lisa) */}

       <div className="profile-container">
      <span style={{ float: 'right', marginRight: '10px' }}></span>
      <img src="https://i.pinimg.com/736x/12/90/b0/1290b009c10a37259ad562b0bcf4d4f8.jpg" width="200" height="200" alt="Description of image" />
      <h2>Becca Lisa</h2>
      <p>Hometown: Los Angeles, CA</p>
      <p>Motto: I want to sell to you!</p>
      <p>38 Homes Sold!!! </p>
      <p>Email: beccalisaisit@gmail.com</p>
    </div>

      {/* //Bio of Sixth Agent (Kim Thompkins) */}

       <div className="profile-container">
      <span style={{ float: 'right', marginRight: '10px'  }}></span>
      <img src="https://www.avisonyoung.us/documents/92502/649587/Madison%2C+Lindsey.jpg/f2d3d6b6-5ba8-45a8-9126-65a2a0b2e130?t=-1465624201" width="200" height="900" alt="Description of image" />
      <h2>Kim Thompkins</h2>
      <p>Hometown: Boston, MA</p>
      <p>Motto: I am the real estate agent for you!</p>
      <p>55 Homes Sold!!! </p>
      <p>Email: kimthompkinssellshomes@aol.com</p>
    </div>


 </div>
      <div style={formStyle}>


  {/* //Real Estate Gif */}
<div className="flex justify-center profile-container ">
    
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXJiczN3MjNxYnJjdnk4d21zNW5zOWZ6ajljejZyajQ3N3Z5aXNhdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TLCpf8koMoNEWkToQD/giphy.gif"  alt="House GIF" />
    </div>  

   
      
      <div className = " flex flex-col  min-h-screen">
        <section className= " flex flex-col items-left text-left gap-8 p-10">
          <p className= "font-bold text-xl ">
            Trending Homes on Project Z
          <p className = "text-sm font-thin ">
              Viewed and saved the most in the area over the last 24 hours
          </p>
          </p>


        </section>

        <Wave/>


        <footer className = "text-center p-3">
        <div className = "text-xs ">
        Project Z Group is committed to ensuring digital accessibility for individuals with disabilities. 
        We are continuously working to improve the accessibility of our web experience for everyone, and we welcome feedback and accommodation requests. 
        If you wish to report an issue or seek an accommodation, please let us know.
        </div>
        <div className ="p-5 text-xs ">Project Z Inc. holds real estate brokerage licenses in multiple states. Project Z (USA), Inc. holds real estate brokerage licenses in multiple provinces.</div>
        <div className = "text-xs ">§ 442-H New York Standard Operating Procedures<div/>
        <div className = "text-xs ">§ New York Fair Housing Notice</div>
        <div className = "text-xs ">TREC: Information about brokerage services, Consumer protection notice</div>
        <div className = "text-xs ">California DRE #1522444</div>
        </div>

        <div className = "p-10 text-base">
        Contact Project Z, Inc. Brokerage
        </div>

        <div className = "text-xs ">
        For listings in USA, the trademarks REALTOR®, REALTORS®, and the REALTOR® logo are controlled 
        by The USA Real Estate Association (CREA) and identify real estate professionals who are members 
        of CREA. The trademarks MLS®, Multiple Listing Service® and the associated logos are owned by CREA and 
        identify the quality of services provided by real estate professionals who are members of CREA. 
        Used under license.
        </div>

        <div className = "flex justify-center space-x-4 m-10">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Download on the App Store">
            <img src="https://s.zillowstatic.com/pfs/static/app-store-badge.svg"  alt="App store logo"  height="32" width="96"  title="Download on the App Store" loading="lazy" />
          </a>

          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Download on the App Store">
          <img src="https://s.zillowstatic.com/pfs/static/google-play-badge.svg"  alt="Google play logo"  height="32" width="108"  title="Get it on Google Play" loading="lazy" decoding="async"></img>
          </a>
        </div>

        </footer>

      </div>
      </div>
    </div>
  );
}
