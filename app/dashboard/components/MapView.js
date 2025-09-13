"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient"; // ajusta la ruta
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const filtersParam = searchParams.get("filters"); // Ej: "Montaña,Nevado"
  const filters = filtersParam ? filtersParam.split(",") : [];

  const [pos, setPos] = useState([4.4389, -75.2322]);
  const [points, setPoints] = useState([]);
  const [alertShown, setAlertShown] = useState(false); // para no repetir alert

  // Posición del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setPos([p.coords.latitude, p.coords.longitude]),
        () => {},
        { timeout: 5000 }
      );
    }
  }, []);

  // Traer sitios filtrados
  useEffect(() => {
    const fetchPoints = async () => {
      let query = supabase
        .from("sites")
        .select("id, name, latitude, longitude, site_tags(tag_id, tags(name))");

      if (filters.length > 0) {
        query = query.contains("site_tags->tags->name", filters);
      }

      const { data, error } = await query;
      if (!error && data) {
        const mapped = data.map((s) => ({
          id: s.id,
          name: s.name,
          coords: [s.latitude, s.longitude],
        }));
        setPoints(mapped);

        // Mostrar alerta si no hay sitios
        if (mapped.length === 0 && !alertShown && filters.length > 0) {
          alert("No hay sitios disponibles con esa etiqueta.");
          setAlertShown(true);
        }
      }
    };
    fetchPoints();
  }, [filters, alertShown]);

  return (
    <MapContainer center={pos} zoom={9} style={{ height: "100%", width: "100%" }}>
      <FocusHandler />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Marcador del usuario */}
      <Marker position={pos} icon={userIcon}>
        <Popup>Estás aquí</Popup>
      </Marker>

      {/* Marcadores filtrados */}
      {points.map((pt) => (
        <Marker key={pt.id} position={pt.coords} icon={MarkerIcon}>
          <Popup>{pt.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
