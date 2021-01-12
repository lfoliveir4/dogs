import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Error";

import { useForm } from "../../hooks/useForm";

import styles from "./loginform.module.css";
import stylesButton from "../Forms/Button/button.module.css";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { signIn, error, loading } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      signIn(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          placeholder="E-mail"
          {...username}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Senha"
          {...password}
        />

        {loading ? (
          <Button disabled>Carregando</Button>
        ) : (
          <Button type="submit" data-testid="test-login-form">
            Entrar
          </Button>
        )}

        <Error error={error} />
      </form>

      <Link className={styles.forgot} to="/login/perdeu">
        Perdeu a senha?
      </Link>

      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>

        <Link className={stylesButton.button} to="/login/criar">
          cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
