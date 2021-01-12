import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

import { PASSWORD_RESET } from "../../services/api";

import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import Error from "../../components/Error";

const LoginPasswordReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const password = useForm();

  const navigate = useNavigate();

  const { error, loading, request } = useFetch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const key = params.get("key");
    const login = params.get("login");

    if (key) {
      setKey(key);
    }

    if (login) {
      setLogin(login);
    }
  }, []);

  async function resetPassword() {
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });

      const { response } = await request(url, options);

      if (response.ok) {
        navigate("/login");
      }
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Resete a senha</h1>

      <form onSubmit={resetPassword}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />

        {loading ? (
          <Button disabled>Resetando.....</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
