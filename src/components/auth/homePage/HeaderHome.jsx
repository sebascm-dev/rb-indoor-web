import React from "react";

import { supabase } from "../../../supabase/client";
import { useEffect, useState } from "react";

export const HeaderHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Función para obtener el usuario autenticado
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user); // Almacena el usuario en el estado
        console.log(user);
      } else if (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser(); // Llama a la función cuando el componente se monta
  }, []);

  // Función para generar un color aleatorio
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Función para obtener las iniciales del nombre y apellido
  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    const initials = names.map((name) => name.charAt(0)).join("");
    return initials.substring(0, 2); // Tomamos solo las dos primeras letras
  };
  return (
    <section className="w-full bg-slate-200 p-2 font-inter">
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          {user ? (
            <>
              {user.user_metadata.picture ? (
                <img
                  src={user.user_metadata.picture}
                  alt="Logo del usuario"
                  className="size-16 rounded-full"
                />
              ) : (
                <div
                  className="size-16 rounded-full flex items-center justify-center text-white text-lg font-semibold"
                  style={{ backgroundColor: generateRandomColor() }}
                >
                  {getInitials(
                    user.user_metadata.full_name ||
                      user.user_metadata.completedName
                  )}
                </div>
              )}
              <h2 className="text-lg font-semibold">
                {user.user_metadata.full_name ||
                  user.user_metadata.completedName}
              </h2>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-2">
                <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
                  <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
                </div>
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-red-500/60 hover:text-red-500/80 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-logout"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M9 12h12l-3 -3" />
            <path d="M18 15l3 -3" />
          </svg>
        </button>
      </header>
    </section>
  );
};
