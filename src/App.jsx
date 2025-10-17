import { useState } from "react";
import "./App.css";
import Breadboard from "./components/Breadboard.jsx";
import Wire from "./components/Wire.jsx";

function App() {
  return (
    <>
      <Breadboard></Breadboard>
      <Wire></Wire>
    </>
  );
}

export default App;
