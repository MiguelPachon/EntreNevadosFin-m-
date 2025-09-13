"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSearchParams } from "next/navigation";

// Iconos
const userIcon = new L.Icon({
  iconUrl: "/images/user-marker.png",
  iconSize: [32, 32],
});

const MarkerIcon = new L.Icon({
  iconUrl: "/images/marker.png",
  iconSize: [28, 28],
});

// Handler para centrar en coordenadas específicas
function FocusHandler({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      coords.forEach((c) => map.flyTo(c, 12));
    }
  }, [coords, map]);
  return null;
}

export default function MapView() {
  const searchParams = useSearchParams();
  const filterQuery = searchParams.get("filters") || "";
  const filters = filterQuery.split(",").filter(Boolean);

  // Coordenadas estáticas de ejemplo
  const allSites = [
    { id: 1, name: "Nevado del Tolima", coords: [4.6584, -75.2976], tags: ["Montaña", "Aventura"] },
    { id: 2, name: "Ibagué Centro", coords: [4.4389, -75.2322], tags: ["Cultural"] },
    { id: 3, name: "Parque Natural", coords: [4.55, -75.28], tags: ["Río", "Relax"] },
  ];

  const [pos, setPos] = useState([4.4389, -75.2322]);
  const [visibleSites, setVisibleSites] = useState([]);

  useEffect(() => {
    // Filtra sitios según filtros
    if (filters.length > 0) {
      const filtered = allSites.filter((site) =>
        filters.every((f) => site.tags.includes(f))
      );
      setVisibleSites(filtered);

      if (filtered.length === 0) {
        alert("No hay sitios disponibles con esa etiqueta");
        setVisibleSites(allSites); // mostrar todos como fallback
      }
    } else {
      setVisibleSites(allSites);
    }

    // Geolocalización del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setPos([p.coords.latitude, p.coords.longitude]),
        () => {}
      );
    }
  }, [filters]);

  return (
    <MapContainer center={pos} zoom={9} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={pos} icon={userIcon}>
        <Popup>Estás aquí</Popup>
      </Marker>

      {visibleSites.map((site) => (
        <Marker key={site.id} position={site.coords} icon={MarkerIcon}>
          <Popup>{site.name}</Popup>
        </Marker>
      ))}

      <FocusHandler coords={visibleSites.map((s) => s.coords)} />
    </MapContainer>
  );
}
