"use client";
import SitesList from "../../../components/SitesList";
import Navbar from "../../../components/Navbar";

export default function DashboardSites() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Explorar Sitios</h1>
        <SitesList />
      </div>
    </>
  );
}
