import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";

import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import Error from "../../components/Error";

import { CREATE_USER } from "../../services/api";

import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const { signIn } = useContext(UserContext);

  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { url, options } = CREATE_USER({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      const { response } = await request(url, options);

      if (response.ok) {
        signIn(username.value, password.value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          placeholder="Nome"
          {...username}
        />

        <Input
          label="E-mail"
          type="email"
          name="email"
          placeholder="E-mail"
          {...email}
        />

        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Senha"
          {...password}
        />

        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button type="submit" data-testid="test-register-form">
            Cadastrar
          </Button>
        )}
      </form>

      <Error error={error} />
    </section>
  );
};

export default LoginCreate;
