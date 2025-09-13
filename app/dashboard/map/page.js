"use client";             // necesario porque Leaflet usa window
import MapView from "../dashboard/components/MapView.js";

export const dynamic = "force-dynamic"; // evita prerender en el servidor

export default function MapPage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapView />
    </div>
  );
}
