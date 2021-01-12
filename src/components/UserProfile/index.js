import React from "react";
import { useParams } from "react-router-dom";

import Feed from "../Feed";
import Head from "../Head";

const UserProfile = () => {
  const { user } = useParams();

  return (
    <section className="container mainSection">
      <Head title={`${user} `} description={`Perfil do ${user}`} />
      <h1 className="title">{user}</h1>
      <Feed user={user} />
    </section>
  );
};

export default UserProfile;
