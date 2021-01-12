import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import LoginForm from "../../components/LoginForm";
import LoginCreate from "../../pages/SignUp";
import LoginPasswordLost from "../../pages/PasswordLost";
import LoginPasswordReset from "../../pages/PasswordReset";
import NotFound from "../../pages/NotFound";

import styles from "./styles.module.css";

const Login = () => {
  const { logged } = useContext(UserContext);

  if (logged) {
    return <Navigate to="/conta" />;
  } else {
    return (
      <section className={styles.login}>
        <div className={styles.forms}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="criar" element={<LoginCreate />} />
            <Route path="perdeu" element={<LoginPasswordLost />} />
            <Route path="resetar" element={<LoginPasswordReset />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </section>
    );
  }
};

export default Login;
