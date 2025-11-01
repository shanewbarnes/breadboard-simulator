import { useState } from "react";
import "./App.css";
import Breadboard from "./components/Breadboard.jsx";
import ComponentContainer from "./components/ComponentContainer.jsx";
import Wire from "./components/Wire.jsx";
import Lightbulb from "./components/Lightbulb.jsx";

function App() {
  /*  NOTE: Breadboard needs to be rendered second here */
  return (
    <>
      <ComponentContainer Component={Wire}></ComponentContainer>
      <Breadboard></Breadboard>
    </>
  );
}

export default App;
