// components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    // Obtener sesión inicial
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (mounted) setSessionUser(data.user ?? null);
      } catch (err) {
        console.error("getUser:", err);
      }
    };

    getUser();

    // Suscribirse a cambios de auth (login/logout) para mantener la UI sincronizada
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSessionUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Después de cerrar sesión redirigimos
    router.push("/login");
  };

  return (
    <header className="bg-white/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/entrenevados.png"
              alt="Logo EntreNevados"
              width={200}
              height={60}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/">Inicio</Link>
          <Link href="#">Categorías</Link>

          {/* Si no hay usuario, mostrar Ingresar / Registrarse */}
          {!sessionUser ? (
            <>
              <Link href="/login" className="text-gray-700">
                Ingresar
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-amber-400 text-white rounded-lg"
              >
                Registrarse
              </Link>
            </>
          ) : (
            // Si hay sesión, mostrar email y botón de logout
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{sessionUser.email}</span>
              <button
                onClick={handleLogout}
                className="mt-3 w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-500"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
