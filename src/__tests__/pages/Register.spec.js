import "../../__mocks__/react-router-dom";
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import AxiosMock from "axios-mock-adapter";
import api from "../../__mocks__/api";

import SignUp from "../../pages/SignUp";
import AppProvider from "../../context";

const apiMock = new AxiosMock(api);

describe(" Register ", () => {
  it("should be able to register new user", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <AppProvider>
          <SignUp />
        </AppProvider>
      </Router>
    );

    const nameInput = getByPlaceholderText("Nome");
    const emailInput = getByPlaceholderText("E-mail");
    const passwordInput = getByPlaceholderText("Senha");

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Luis" } });
      fireEvent.change(emailInput, {
        target: { value: "lfoliveira@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
    });

    expect(nameInput.value).toBe("Luis");
    expect(emailInput.value).toBe("lfoliveira@gmail.com");
    expect(passwordInput.value).toBe("123456");

    await act(async () => {
      fireEvent.click(getByTestId("test-register-form"));
    });

    apiMock.onPost("/api/user").reply(200, {
      username: nameInput,
      email: emailInput,
      password: passwordInput,
    });
  });
});
