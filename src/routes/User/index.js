import React from "react";
import { Route, Routes } from "react-router-dom";

import Feed from "../../components/Feed";
import NotFound from "../../pages/NotFound";

import UserPhotoPost from "../../pages/UserPhotoPost";
import UserHeader from "../../components/UserHeader";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const User = () => {
  const { dataUser } = useContext(UserContext);

  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={dataUser.id} />} />
        <Route path="/postar" element={<UserPhotoPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
