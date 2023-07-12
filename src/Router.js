import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import { Home, About, Album } from "./views";
import NavBar from "./components/NavBar/NavBar";

const Router = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/album" element={<Album />} />
        <Route index element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default Router;
