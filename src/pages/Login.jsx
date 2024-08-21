import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase/client";

import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Inicio de sesión exitoso!!");
    } catch (error) {
      console.error("Error creando el usuario:", error.message);
      toast.error("Error al iniciar sesión: " + error.message); // También podrías manejar errores con una toast
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;

      toast.success("Inicio de sesión exitoso!!");
    } catch (error) {
      console.error("Error creando el usuario:", error.message);
      toast.error("Error al iniciar sesión: " + error.message);
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setTimeout(() => {
          navigate("/");
        }, 3000); // Espera 3 segundos antes de navegar
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
        <h1 className="text-3xl font-bold">Inicio de Sesión</h1>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="rbindoorlpdc@gmail.com"
            className="text-[14px] text-black/50 border-b border-black/50 py-2 focus:outline-none focus:border-black transition-colors duration-150"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="text-[14px] text-black/50 border-b border-black/50 py-2 focus:outline-none focus:border-black transition-colors duration-150"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="text-black mt-4 bg-[#C3FA40] rounded-[7px] h-12 hover:bg-[#C3FA40]/60 transition-colors duration-300"
            disabled={isLoading} // Deshabilitar el botón mientras carga
          >
            {isLoading ? "Iniciando Sesión..." : "Continuar"}{" "}
            {/* Cambiar el texto */}
          </button>
        </form>
        <p className="text-center my-2">or</p>
        <button
          type="submit"
          className="text-black w-full bg-[#3C3C3C]/10 rounded-[7px] h-12 hover:bg-[#3C3C3C]/30 transition-colors duration-300"
          onClick={handleSubmit2}
          disabled={isLoading} // Deshabilitar el botón mientras carga
        >
          {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión con Google"}{" "}
          {/* Cambiar el texto */}
        </button>
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <p className="text-black/50 mb-4">
            ¿No tienes una cuenta?,{" "}
            <a href="/signup" className="text-[#4C6C00]">
              Regístrate
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
};
