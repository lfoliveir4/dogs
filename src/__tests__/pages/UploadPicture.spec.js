import "../../__mocks__/react-router-dom";
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import AxiosMock from "axios-mock-adapter";
import api from "../../__mocks__/api";

import UserPhotoPost from "../../pages/UserPhotoPost";
import AppProvider from "../../context";

const apiMock = new AxiosMock(api);

describe("UserPhotoPost", () => {
  it("should a be able to upload picture", async () => {
    global.URL.createObjectURL = jest.fn();

    const file = new File(["dog"], "dog.png", { type: "image/png" });

    const { getByTestId, getByPlaceholderText } = render(
      <Router>
        <AppProvider>
          <UserPhotoPost />
        </AppProvider>
      </Router>
    );

    const inputName = getByPlaceholderText("Nome");
    const inputWeight = getByPlaceholderText("Peso");
    const inputAge = getByPlaceholderText("Idade");
    const inputPicture = getByTestId("input-upload-picture");

    act(() => {
      fireEvent.change(inputName, { target: { value: "Rex" } });
      fireEvent.change(inputWeight, { target: { value: "20" } });
      fireEvent.change(inputAge, { target: { value: "2" } });
      fireEvent.change(inputPicture, { target: { files: [file] } });
    });

    expect(inputName.value).toBe("Rex");
    expect(inputWeight.value).toBe("20");
    expect(inputAge.value).toBe("2");

    expect(inputPicture.files[0]).toStrictEqual(file);
    expect(inputPicture.files).toHaveLength(1);
    expect(inputPicture.files).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId("test-register-form-upload-picture"));
    });
  });
});
