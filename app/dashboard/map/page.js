"use client";  // necesario porque MapView usa window

import MapView from "../../dashboard/components/MapView";

export const dynamic = "force-dynamic"; // evita prerender y el error "window is not defined"

export default function MapPage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapView />
    </div>
  );
}

