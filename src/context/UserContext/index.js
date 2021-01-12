import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { GET_USER, TOKEN_POST, VALIDATE_TOKEN } from "../../services/api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState(null);
  const [logged, setLogged] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    setDataUser(null);
    setError(null);
    setLoading(false);
    setLogged(false);

    localStorage.removeItem("dog:token");

    navigate("/login");
  }, [navigate]);

  async function getUser(token) {
    const { url, options } = GET_USER(token);

    const response = await fetch(url, options);
    const data = await response.json();

    setDataUser(data);
    setLogged(true);
  }

  async function signIn(username, password) {
    try {
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: Usuário Inválido`);
      }

      const { token } = await response.json();

      localStorage.setItem("dog:token", token);
      await getUser(token);

      navigate("/conta");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("dog:token");

      if (!token) {
        logout();
        return;
      }

      try {
        setLoading(true);
        const { url, options } = VALIDATE_TOKEN(token);
        await fetch(url, options);
        await getUser(token);

        setLoading(false);
      } catch (error) {
        if (error.response && error.response.ok) {
          throw new Error("Token inválido");
        }

        logout();
      }
    }

    loadUser();
  }, [logout]);

  return (
    <UserContext.Provider
      value={{ signIn, dataUser, logout, error, loading, logged }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
