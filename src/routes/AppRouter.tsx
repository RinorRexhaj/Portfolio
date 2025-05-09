import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";

const AppRouter: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};

export default AppRouter;
