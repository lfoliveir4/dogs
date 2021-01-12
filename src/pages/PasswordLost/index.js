import React from "react";

import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

import { RESET_PASSWORD } from "../../services/api";

import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import Error from "../../components/Error";

const LoginPasswordLost = () => {
  const login = useForm();

  const { data, loading, error, request } = useFetch();

  async function handleResetPassword(event) {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = RESET_PASSWORD({
        login: login.value,
        url: window.location.href.replace("perdeu", "resetar"),
      });

      await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Perdeu a senha?</h1>

      {data ? (
        <p> {data}</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <Input label="Email/Usuário" type="text" name="login" {...login} />

          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
