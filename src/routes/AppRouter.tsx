import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};

export default AppRouter;
