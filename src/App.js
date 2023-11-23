import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Vinyls from "./pages/vinyls";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signnup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vinyls" element={<Vinyls />} />
      </Routes>
    </BrowserRouter>
  );
}
