// app/dashboard/components/Plans.js
"use client";

export default function Plans() {
  const plans = [
    {
      id: 1,
      image: "/images/aventura.jpg",
      title: "Turismo de Aventura",
      subtitle: "Escalada, rafting y senderismo",
      coords: [4.6584, -75.2976],
    },
    {
      id: 2,
      image: "/images/naturaleza.jpg",
      title: "Turismo de Naturaleza",
      subtitle: "Avistamiento de aves y senderismo ecológico",
      coords: [4.5, -75.3],
    },
    {
      id: 3,
      image: "/images/historico.jpg",
      title: "Turismo Histórico",
      subtitle: "Patrimonio cultural y tours coloniales",
      coords: [4.45, -75.25],
    },
  ];

  return (
    <div className="space-y-4">
      {plans.map((p) => (
        <div key={p.id} className="bg-white rounded-lg shadow overflow-hidden">
          <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-lg">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.subtitle}</p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("focusOn", { detail: p.coords }))}
              className="mt-3 w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-500"
            >
              Ver en mapa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
