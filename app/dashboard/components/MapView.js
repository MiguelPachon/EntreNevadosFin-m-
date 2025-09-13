// app/dashboard/components/MapView.js
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Asegúrate de tener /public/images/user-marker.png y /public/images/marker.png
const userIcon = new L.Icon({
  iconUrl: "/images/user-marker.png",
  iconSize: [32, 32],
});

const MarkerIcon = new L.Icon({
  iconUrl: "/images/marker.png",
  iconSize: [28, 28],
});

function FocusHandler() {
  const map = useMap();
  useEffect(() => {
    const handler = (e) => {
      const coords = e.detail;
      if (coords && Array.isArray(coords)) map.flyTo(coords, 12);
    };
    window.addEventListener("focusOn", handler);
    return () => window.removeEventListener("focusOn", handler);
  }, [map]);
  return null;
}

export default function MapView() {
  const [pos, setPos] = useState([4.4389, -75.2322]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setPos([p.coords.latitude, p.coords.longitude]),
        () => {},
        { timeout: 5000 }
      );
    }
  }, []);

  const points = [
    { id: 1, name: "Nevado del Tolima", coords: [4.6584, -75.2976] },
    { id: 2, name: "Ibagué Centro", coords: [4.4389, -75.2322] },
    { id: 3, name: "Parque Natural", coords: [4.55, -75.28] },
  ];

  return (
    <MapContainer center={pos} zoom={9} style={{ height: "100%", width: "100%" }}>
      <FocusHandler />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      <Marker position={pos} icon={userIcon}>
        <Popup>Estás aquí</Popup>
      </Marker>

      {points.map((pt) => (
        <Marker key={pt.id} position={pt.coords} icon={MarkerIcon}>
          <Popup>{pt.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
