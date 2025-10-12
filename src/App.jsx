import { useState } from "react";
import "./App.css";
import Breadboard from "./Breadboard.jsx";
import { Wire } from "./Tools.jsx";

function App() {
  return (
    <>
      <Breadboard></Breadboard>
      <Wire></Wire>
    </>
  );
}

export default App;
