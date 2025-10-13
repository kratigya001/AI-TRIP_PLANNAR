import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3JhdGlneWE5MzM0IiwiYSI6ImNtZTViYjFxajBweGMyc29ucXF6dGdrZnUifQ.gy42q2rlZ-BpsMXs6ch6xQ";

export default function MapboxPlacesAutocomplete({ onChange }) {
  const geocoderContainer = useRef(null);
  const geocoderRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState("");

  useEffect(() => {
    if (geocoderRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "   Search for places...",
      types: "place,region,country",
      marker: false,
      mapboxgl: mapboxgl,
    });

    geocoderRef.current = geocoder;
    geocoder.addTo(geocoderContainer.current);

    // ✅ Style the input after it mounts
    setTimeout(() => {
      const box = document.querySelector(".mapboxgl-ctrl-geocoder");
      const input = document.querySelector(".mapboxgl-ctrl-geocoder--input");

      if (box) {
        box.style.width = "100%";
        box.style.maxWidth = "none";
        box.style.borderRadius = "10px";
        box.style.overflow = "hidden";
        box.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.1)";
      }

      if (input) {
        input.style.width = "100%";
        input.style.padding = "12px 16px";
        input.style.fontSize = "16px";
        input.style.color = "#000";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "10px";
        input.style.outline = "none";
      }
    }, 500);

    geocoder.on("result", (e) => {
      const place = e.result.place_name;
      setSelectedPlace(place);
      if (onChange) onChange(place);
    });

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.onRemove();
        geocoderRef.current = null;
      }
    };
  }, [onChange]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        width: "100%",
      }}
    >
      {/* ✅ Full-width search bar container */}
      <div
        ref={geocoderContainer}
        style={{
          width: "100%",
        }}
      />

      {/* Show selected place below */}
      {selectedPlace && (
        <p
          style={{
            marginTop: "12px",
            fontSize: "16px",
            fontWeight: "500",
            textDecoration: "underline",
            color: "#333",
            textAlign: "center",
          }}
        >
          Selected Place: {selectedPlace}
        </p>
      )}
    </div>
  );
}
