"use client";
import { useState, useEffect } from "react";
import Filters from "./Filters";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SitesList() {
  const [sites, setSites] = useState([]);
  const [filters, setFilters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSites = async () => {
      let query = supabase.from("sites").select("*, site_tags(tag_id, tags(name))");
      if (filters.length > 0) {
        query = query.contains("site_tags->tags->name", filters);
      }
      const { data, error } = await query;
      if (!error) setSites(data);
    };
    fetchSites();
  }, [filters]);

  const handleGoToMap = () => {
    if (filters.length === 0) return;
    const queryParam = filters.join(",");
    router.push(`/map?filters=${encodeURIComponent(queryParam)}`);
  };

  return (
    <div className="flex gap-6">
      <Filters onFilterChange={setFilters} />

      <div className="flex-1">
        {/* Botón para ir al mapa */}
        <div className="mb-4">
          <button
            onClick={handleGoToMap}
            className="bg-amber-400 text-white px-4 py-2 rounded hover:bg-amber-500"
          >
            Filtrar y ver en el mapa
          </button>
        </div>

        {/* Lista de sitios */}
        <div className="grid gap-4">
          {sites.map((site) => (
            <div key={site.id} className="p-4 border rounded bg-gray-50">
              <h3 className="text-lg font-bold">{site.name}</h3>
              <p>{site.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
