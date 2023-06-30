import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Hompage/Hompage";
import { DarkModeProvider } from "./components/hook/DarkModeContext";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </DarkModeProvider>
    </BrowserRouter>
  );
}

export default App;
