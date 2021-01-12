import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import { useMedia } from "../../hooks/useMedia";

import { ReactComponent as MyPictures } from "../../assets/feed.svg";
import { ReactComponent as Stats } from "../../assets/estatisticas.svg";
import { ReactComponent as AddPictures } from "../../assets/adicionar.svg";
import { ReactComponent as Logout } from "../../assets/sair.svg";

import styles from "./userheadernav.module.css";

const UserHeaderNav = () => {
  const isMobile = useMedia("(max-width: 40rem)");
  const { logout } = useContext(UserContext);

  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/conta/estatisticas":
        return setMobileMenu(false);

      case "/conta/postar":
        return setMobileMenu(false);

      default:
        return setMobileMenu(false);
    }
  }, [location]);

  return (
    <>
      {isMobile && (
        <button
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
        ></button>
      )}

      <nav
        className={`${isMobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end activeClassName={styles.active}>
          <MyPictures />

          {isMobile && "Minhas Fotos"}
        </NavLink>

        <NavLink to="/conta/postar" activeClassName={styles.active}>
          <AddPictures />
          {isMobile && "Adicionar Foto"}
        </NavLink>

        <button onClick={logout}>
          {isMobile && "Sair"}

          <Logout />
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
