import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import { ReactComponent as Dogs } from "../../assets/dogs.svg";

import "./header.css";

const Header = () => {
  const { dataUser } = useContext(UserContext);

  return (
    <header className="header">
      <nav className="nav container">
        <Link className="logo" to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>

        {dataUser ? (
          <Link className="login" to="/conta">
            {dataUser.nome}
          </Link>
        ) : (
          <Link className="login" to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
