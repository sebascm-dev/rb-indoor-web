import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";

export function Protected({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => {
      authListener && authListener.unsubscribe && authListener.unsubscribe();
    };
  }, [navigate]);

  return children;
}
