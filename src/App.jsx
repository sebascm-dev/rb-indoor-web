import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Home />} /> {/* Protegido con Auth */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
