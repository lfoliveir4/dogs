import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserHeaderNav from "../UserHeaderNav";

import styles from "./userheader.module.css";

const UserHeader = () => {
  const [title, setTitle] = useState();

  const location = useLocation();

  useEffect(() => {
    setTitle(location.pathname);

    switch (location.pathname) {
      case "/conta/estatisticas":
        return setTitle("Estatisticas");

      case "/conta/postar":
        return setTitle("Poste sua foto");

      default:
        return setTitle("Minha Conta");
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>

      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
