import "../../__mocks__/react-router-dom";
import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import AxiosMock from "axios-mock-adapter";
import api from "../../__mocks__/api";
import { BrowserRouter as Router } from "react-router-dom";

import AppProvider from "../../context";

import Feed from "../../components/Feed";

const apiMock = new AxiosMock(api);

const wait = () => {
  return new Promise((resolve) => setTimeout(resolve));
};

describe("Feed", () => {
  it("should be able to fetch photos on feed", async () => {
    const { getByText } = render(
      <Router>
        <AppProvider>
          <Feed />
        </AppProvider>
      </Router>
    );

    apiMock.onGet(`/api/photo/?_page=$1&_total=6&_user=dog`).reply(200, [
      {
        acessos: "17306",
        author: "cat",
        date: "2020-07-20 21:24:23",
        id: 239,
        idade: "12",
        peso: "10",
        src:
          "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/freddie-marriage-w39PTDxKiK8-unsplash-1-1000x1000.jpg",
        title: "Joel",
        total_comments: "1",
      },
      {
        acessos: "45955",
        author: "cat",
        date: "2020-07-20 21:21:37",
        id: 233,
        idade: "12",
        peso: "4",
        src:
          "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/charles-deluvio-Mv9hjnEUHR4-unsplash-1-1000x1000.jpg",
        title: "Ellie",
        total_comments: "1",
      },
      {
        acessos: "1915",
        author: "cat",
        date: "2020-07-20 21:16:20",
        id: 229,
        idade: "8",
        peso: "3",
        src:
          "https://dogsapi.origamid.dev/wp-content/uploads/2020/07/alan-quirvan-Un2l252-pWA-unsplash-1-1000x1000.jpg",
        title: "Ashley",
        total_comments: "0",
      },
    ]);

    await wait(() => expect(getByText("cat")).toBeTruthy());
    await wait(() => expect(getByText("17306")).toBeTruthy());

    await wait(() => expect(getByText("cat")).toBeTruthy());
    await wait(() => expect(getByText("45955")).toBeTruthy());

    await wait(() => expect(getByText("cat")).toBeTruthy());
    await wait(() => expect(getByText("1915")).toBeTruthy());
  });
});
