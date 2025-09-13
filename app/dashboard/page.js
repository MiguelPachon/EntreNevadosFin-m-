// app/dashboard/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../../components/Navbar";
import dynamic from "next/dynamic";
import Plans from "./components/PlansList.js";

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user ?? null;

      if (!currentUser) {
        router.push("/login");
        return;
      }

      if (mounted) {
        setUser(currentUser);
      }

      // Obtener perfil adicional desde la tabla profiles (si existe)
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (mounted) {
        setProfile(profileData ?? null);
        setLoading(false);
      }
    };

    getUser();

    // Suscribimos a cambios de sesión para actualizar UI si el usuario cierra sesión desde otro tab
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, [router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex items-center justify-center">
          <p>Cargando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-72px)]">
        {/* Izquierda: planes con imágenes */}
        <aside className="w-1/3 p-6 overflow-y-auto bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Bienvenido, {profile?.full_name || user?.email}</h2>
          <p className="text-gray-600 mb-4">Tus Planes</p>
          <Plans />
        </aside>

        {/* Derecha: mapa */}
        <main className="flex-1">
          <MapView />
        </main>
      </div>
    </>
  );
}
