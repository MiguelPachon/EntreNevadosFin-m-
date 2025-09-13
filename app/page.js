import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('./images/nevado.png')" }}>
        <div className="bg-black bg-opacity-40 min-h-screen flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Atrevete A La <span className="text-yellow-400">Aventura</span></h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8">
            Explora los majestuosos nevados, paisajes únicos y la rica cultura del departamento más hermoso de Colombia.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard" className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold shadow">Explorar Destinos</Link>
            <Link href="/dashboard" className="px-6 py-3 border border-white/40 rounded-lg font-semibold">Ver Mapa</Link>
          </div>
        </div>
      </main>
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#15503b]">Tipos de Turismo</h2>
          <p className="text-center text-gray-600 mb-8">Descubre las diferentes formas de explorar el Tolima</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <img src="./images/aventura.jpg" alt="" className="rounded-md mb-4 w-full h-44 object-cover"/>
              <h3 className="text-xl font-semibold mb-2">Turismo de Aventura</h3>
              <p className="text-sm text-gray-600 mb-4">Escalada, rafting y senderismo en los nevados del Tolima.</p>
              <button className="w-full bg-amber-500 text-white py-2 rounded">Explorar Aventura</button>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <img src="./images/naturaleza.jpg" alt="" className="rounded-md mb-4 w-full h-44 object-cover"/>
              <h3 className="text-xl font-semibold mb-2">Turismo de Naturaleza</h3>
              <p className="text-sm text-gray-600 mb-4">Avistamiento de aves y senderismo ecológico.</p>
              <button className="w-full bg-amber-500 text-white py-2 rounded">Explorar Naturaleza</button>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <img src="./images/historico.jpg" alt="" className="rounded-md mb-4 w-full h-44 object-cover"/>
              <h3 className="text-xl font-semibold mb-2">Turismo Histórico</h3>
              <p className="text-sm text-gray-600 mb-4">Patrimonio cultural y tours coloniales.</p>
              <button className="w-full bg-amber-500 text-white py-2 rounded">Explorar Histórico</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
