import React, { useState, useEffect } from 'react';
import GPlace from './reactPlacesContainer';

// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyCuMJ3dhADqNoE4tGuWTI3_NlwBihj5BtE';

// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}

const ReactPlace = (props) => {
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);
  // console.log(props,"----------from container")

  return (
    <div className="container">
      {!loadMap ? <div>Loading...</div> : <GPlace {...props} />}
      </div>
  );
}

export default ReactPlace;