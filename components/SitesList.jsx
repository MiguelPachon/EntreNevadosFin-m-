import { useState, useEffect } from 'react'
import Filters from './Filters'
import { supabase } from '../lib/supabaseClient'

export default function SitesList() {
  const [sites, setSites] = useState([])
  const [filters, setFilters] = useState([])

  useEffect(() => {
    const fetchSites = async () => {
      let query = supabase.from('sites').select('*, site_tags(tag_id, tags(name))')

      if (filters.length > 0) {
        // Busca sitios que tengan TODOS los tags seleccionados
        query = query.contains('site_tags->tags->name', filters)
      }

      const { data, error } = await query
      if (!error) setSites(data)
    }
    fetchSites()
  }, [filters])

  return (
    <div className="flex gap-6">
      <Filters onFilterChange={setFilters} />
      <div className="flex-1 grid gap-4">
        {sites.map(site => (
          <div key={site.id} className="p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-bold">{site.name}</h3>
            <p>{site.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
