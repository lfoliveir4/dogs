import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import AppProvider from "./context";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AppRoutes from "./routes";

import "./styles/global.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
          <Header />
          <main className="AppBody">
            <AppRoutes />
          </main>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
