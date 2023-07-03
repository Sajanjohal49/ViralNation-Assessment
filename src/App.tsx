import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DarkModeProvider } from "./components/hooks/DarkModeContext";
import { Navbar } from "./components/main/Navbar/Navbar";
import Home from "./components/main/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </DarkModeProvider>
    </BrowserRouter>
  );
}

export default App;
