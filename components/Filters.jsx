'use client'
import { useState } from 'react'

const tags = [
  { group: "Entorno", items: ["Montaña", "Nevado", "Río", "Bosque", "Páramo", "Fauna", "Flora"] },
  { group: "Experiencia", items: ["Aventura", "Relax", "Cultural", "Gastronómico", "Fotografía", "Talleres prácticos"] },
  { group: "Perfil", items: ["Familiar", "Niños", "Adultos mayores", "Estudiantes universitarios", "Investigadores"] },
  { group: "Impacto", items: ["Voluntariado", "Conservación", "Comunidad local", "Economía circular"] },
]

export default function Filters({ onFilterChange }) {
  const [selected, setSelected] = useState([])

  const toggleTag = (tag) => {
    const newSelected = selected.includes(tag)
      ? selected.filter(t => t !== tag)
      : [...selected, tag]
    setSelected(newSelected)
    onFilterChange(newSelected) // callback al padre
  }

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-3">Filtros</h2>
      {tags.map(group => (
        <div key={group.group} className="mb-4">
          <h3 className="font-semibold mb-2">{group.group}</h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map(tag => (
              <label key={tag} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(tag)}
                  onChange={() => toggleTag(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
