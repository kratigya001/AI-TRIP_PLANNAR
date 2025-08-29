import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3JhdGlneWE5MzM0IiwiYSI6ImNtZTViYjFxajBweGMyc29ucXF6dGdrZnUifQ.gy42q2rlZ-BpsMXs6ch6xQ";

export default function MapboxPlacesAutocomplete({ onChange }) {
  const geocoderContainer = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    if (geocoderRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Search for places",
      types: "place,region,country",
      marker: false,
      mapboxgl: mapboxgl,
    });

    geocoderRef.current = geocoder;
    geocoder.addTo(geocoderContainer.current);

    const handleResult = (e) => {
      const place = e.result.place_name; // selected place
      if (onChange) onChange(place);

      // ✅ This will automatically show in the input box (Mapbox handles it)
      geocoder.setInput(place);
    };

    geocoder.on("result", handleResult);

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.onRemove();
        geocoderRef.current = null;
      }
    };
  }, [onChange]);

  return (
    <div className="flex justify-center mt-3 w-full">
      <div
        ref={geocoderContainer}
        className="flex justify-center w-full max-w-md"
      />
    </div>
  );
}
