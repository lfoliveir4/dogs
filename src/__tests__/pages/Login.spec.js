import "../../__mocks__/react-router-dom";
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import AxiosMock from "axios-mock-adapter";
import api from "../../__mocks__/api";

import SignIn from "../../components/LoginForm";
import AppProvider from "../../context";

const apiMock = new AxiosMock(api);

describe("Login", () => {
  it("should be able signin on dogs", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <AppProvider>
          <SignIn />
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
      fireEvent.click(getByTestId("test-login-form"));
    });

    apiMock.onPost("/jwt-auth/v1/token").reply(200, {
      username: inputEmail,
      password: inputPassword,
    });
  });

  it("should be able signin but user error email", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <AppProvider>
          <SignIn />
        </AppProvider>
      </Router>
    );

    const inputEmail = getByPlaceholderText("E-mail");
    const inputPassword = getByPlaceholderText("Senha");

    await act(async () => {
      fireEvent.change(inputEmail, { target: { value: "do" } });
      fireEvent.change(inputPassword, { target: { value: "dog" } });
    });

    expect(inputEmail.value).toBe("do");
    expect(inputPassword.value).toBe("dog");

    await act(async () => {
      fireEvent.click(getByTestId("test-login-form"));
    });

    apiMock.onPost("/jwt-auth/v1/token").reply(400, {
      username: "do",
      password: "dog",
    });

    //expect(response).rejects.toEqual("Error: Usuário Inválido");
  });
});
