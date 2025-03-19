
// src/components/Weather/LocationSearch.jsx
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ["places"];

const LocationSearch = ({ searchLocation, setSearchLocation, onPlaceSelected }) => {
  const inputRef = useRef(null);
  const [locationInput, setLocationInput] = useState(searchLocation || '');
  
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries
  });
  
  const searchBoxRef = useRef();
  
  const handleOnPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places?.length > 0) {
      const place = places[0];
      const newLocationData = {
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
        address: place.formatted_address,
        location: place.name,
        city: '',
      };
      
      place.address_components?.forEach(component => {
        if (component.types.includes('locality')) {
          newLocationData.city = component.long_name;
        }
      });
      
      console.log('Selected location data:', newLocationData);
      
      // Update the input field value
      setLocationInput(newLocationData.location);
      if (setSearchLocation) {
        setSearchLocation(newLocationData.location);
      }
      
      // Call the callback to handle the selected place
      if (onPlaceSelected) {
        onPlaceSelected(newLocationData);
      }
    } else {
      console.error('No places found');
    }
  };
  
  return isLoaded ? (
    <StandaloneSearchBox
      onLoad={ref => searchBoxRef.current = ref}
      onPlacesChanged={handleOnPlacesChanged}
    >
      <div className="flex justify-between border border-input focus-within:ring-1 focus-within:ring-primary focus:outline-none shadow-sm rounded-md">
        <div className="flex items-center p-2 text-muted-foreground">
          <MapPin className="h-5 w-5" />
        </div>
        <input
          type="text"
          ref={inputRef}
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder="Search for location"
          className="flex-1 py-2 px-4 bg-transparent focus:outline-none"
        />
      </div>
    </StandaloneSearchBox>
  ) : (
    <div className="flex justify-between border border-input focus-within:ring-1 focus-within:ring-primary focus:outline-none shadow-sm rounded-md">
      <div className="flex items-center p-2 text-muted-foreground">
        <MapPin className="h-5 w-5" />
      </div>
      <input
        type="text"
        disabled
        placeholder="Loading location search..."
        className="flex-1 py-2 px-4 bg-transparent focus:outline-none text-muted-foreground"
      />
    </div>
  );
};

export default LocationSearch;

