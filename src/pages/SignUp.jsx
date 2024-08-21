import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase/client";

import toast, { Toaster } from 'react-hot-toast';

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [completedName, setCompletedName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            completedName,
          },
        },
      });

      if (error) throw error;

      console.log("Usuario creado exitosamente:", data);
      toast.success('Confirma tu cuenta con GMAIL!!')
    } catch (error) {
      console.error("Error creando el usuario:", error.message);
      toast.error('Error creando el usuario...');  // También podrías manejar errores con una toast

    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, []);

  return (
    <section className="h-screen font-inter">
      <Toaster />
      <header className="relative h-[50%] text-white p-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <img
          src="src/assets/fondo-login.webp"
          alt="Fondo"
          className="absolute inset-0 w-full h-[120%] object-cover object-top -z-10"
        />

        <img
          src="src/assets/logo-rb-indoor.webp"
          alt="Logo de la empresa RB-INDOOR"
          className="relative z-10 rounded-full shadow2xl size-32"
        />

        <h1 className="absolute top-4 left-4 z-10 text-sm font-semibold text-white/20">
          RB INDOOR - La Palma del Condado
        </h1>
      </header>

      <footer className="p-4 h-[50%] bg-white rounded-t-xl">
        <h1 className="text-3xl font-bold">Regístrate</h1>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="rbindoorlpdc@gmail.com"
            className="text-[14px] text-black/50 border-b border-black/50 py-2 focus:outline-none focus:border-black transition-colors duration-150"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="completedName"
            placeholder="Nombre Completo"
            className="text-[14px] text-black/50 border-b border-black/50 py-2 focus:outline-none focus:border-black transition-colors duration-150"
            onChange={(e) => setCompletedName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="text-[14px] text-black/50 border-b border-black/50 py-2 focus:outline-none focus:border-black transition-colors duration-150"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-[14px] mt-5">
            Al registrarse, usted acepta nuestros{" "}
            <a
              href="#"
              rel="noopener nooreferer"
              target="_blank"
              className="text-[#4C6C00]"
            >
              Términos & Condiciones y Pólitica
            </a>
          </p>

          <button
            type="submit"
            className="text-black bg-[#C3FA40] rounded-[7px] h-12 hover:bg-[#C3FA40]/60 transition-colors duration-300"
            disabled={isLoading} // Deshabilitar el botón mientras carga
          >
            {isLoading ? "Creando Usuario..." : "Continuar"}{" "}
            {/* Cambiar el texto */}
          </button>

          <div className="w-full flex flex-col justify-center items-center mb-4">
            <p className="text-black/50">
              ¿Tienes ya una cuenta?,{" "}
              <a href="/login" className="text-[#4C6C00]">
                Inicia Sesión
              </a>
            </p>
          </div>
        </form>
      </footer>
    </section>
  );
};
