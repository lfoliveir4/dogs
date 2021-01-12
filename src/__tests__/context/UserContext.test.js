import "../../__mocks__/react-router-dom";
import React, { useContext } from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, act } from "@testing-library/react";
import AxiosMock from "axios-mock-adapter";
import api from "../../__mocks__/api";
import { BrowserRouter as Router } from "react-router-dom";

import AppProvider from "../../context";
import { UserContext } from "../../context/UserContext";

const apiMock = new AxiosMock(api);

const TestComponent = () => {
  const { signIn } = useContext(UserContext);

  function handleLogin() {
    signIn({ username: "dog", password: "dog" });
  }

  return (
    <form data-testid="test-form-componnent" onSubmit={handleLogin}>
      <input value="dog" placeholder="E-mail" type="text" />
      <input value="dog" placeholder="Senha" type="text" />
      <button type="submit">Entrar</button>
    </form>
  );
};

describe("User Context", () => {
  it("should be able to signin", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <AppProvider>
          <TestComponent />
        </AppProvider>
      </Router>
    );

    const inputEmail = getByPlaceholderText("E-mail");
    const inputPassword = getByPlaceholderText("Senha");

    await act(async () => {
      fireEvent.change(inputEmail, { target: { value: "dog" } });
      fireEvent.change(inputPassword, { target: { value: "dog" } });
    });

    expect(inputEmail.value).toBe("dog");
    expect(inputPassword.value).toBe("dog");

    await act(async () => {
      fireEvent.click(getByTestId("test-form-componnent"));
    });

    apiMock.onPost("/jwt-auth/v1/token").reply(200, {
      username: inputEmail,
      password: inputPassword,
    });
  });
});
