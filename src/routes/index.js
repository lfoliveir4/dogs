import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../routes/SignIn";
import User from "./User";
import Photo from "../pages/Photo";
import UserProfile from "../components/UserProfile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login/*" element={<Login />} />
      <Route path="foto/:id" element={<Photo />} />
      <Route path="perfil/:user" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />

      <ProtectedRoute path="conta/*" element={<User />} />
    </Routes>
  );
};

export default AppRoutes;
