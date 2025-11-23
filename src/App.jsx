import { useState } from "react";
import "./App.css";
import Breadboard from "./components/Breadboard.jsx";
import ComponentContainer from "./components/ComponentContainer.jsx";
import Wire from "./components/Wire.jsx";
import Lightbulb from "./components/Lightbulb.jsx";

/*  NOTE: Breadboard needs to be rendered second here */
function App() {
  return (
    <>
      <ComponentContainer Component={Lightbulb}></ComponentContainer>
      <Breadboard></Breadboard>
    </>
  );
}

export default App;
