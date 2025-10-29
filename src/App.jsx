import { useState } from "react";
import "./App.css";
import Breadboard from "./components/Breadboard.jsx";
import ComponentContainer from "./components/ComponentContainer.jsx";
import Wire from "./components/Wire.jsx";
import Lightbulb from "./components/Lightbulb.jsx";

function App() {
  return (
    <>
      <ComponentContainer Component={Wire}></ComponentContainer>
      <div className="breadboard-container">
        <Breadboard></Breadboard>
      </div>
    </>
  );
}

export default App;
