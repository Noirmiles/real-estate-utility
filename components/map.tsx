"use client"
import { useEffect, useRef, useState } from "react";
// we will use make styles for styling components, you can use another solutions (like css, sass or cssonjs
import styled  from "@emotion/styled";
// api mock data
// import Apartments from "./homes";

// Our component will receive center coords and zoom size in props
type MapProps = {
  center: google.maps.LatLngLiteral
  zoom: number
}



const apiKey = 'AIzaSyA3hodoDpLt7mDpN1fL8d9RnrW8i8jaJSA'

function Map({ center, zoom }: MapProps) {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map| null>(null)

  useEffect(() => {
    // we need to save google-map object for adding markers and routes in future
    if (ref.current) {
      // here will connect map frame to div element in DOM by using ref hook
      let createdMap = new window.google.maps.Map(
        ref.current,
        {
          center,
          zoom,
          disableDefaultUI: true,
          clickableIcons: false
        }
      );
      setMap(createdMap)
    }
  }, [center, zoom]);

  // map will be connect to this div block
  
  return <div className="map-container rounded-lg mr-4 ml-4" ref={ref} style={{height: '100vh', width:'60vw'}}id="map" />;
}

export default Map