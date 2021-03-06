import React from "react";
import "./App.css";
import Routes from "./Routes";
import Header from "./components/header/Header";

export default function App() {
  return (
    <div id="app">
      <Header />
      <Routes />
    </div>
  );
}