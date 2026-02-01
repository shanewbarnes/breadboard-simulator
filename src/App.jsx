import { useState } from "react";
import "./App.css";
import Breadboard from "./components/Breadboard.jsx";
import Toolbar from "./components/Toolbar.jsx";
import ComponentContainer from "./components/ComponentContainer.jsx";
import Wire from "./components/Wire.jsx";
import Lightbulb from "./components/Lightbulb.jsx";

function App() {
  const [components, setComponents] = useState([]);

  function handleToolbarClick(clientX, clientY, Component) {
    setComponents([
      ...components,
      <ComponentContainer
        Component={Component}
        initialPosition={{ left: clientX, top: clientY }}
      ></ComponentContainer>,
    ]);
  }

  return (
    <>
      <div className="app-container">
        <Toolbar>
          <ComponentContainer
            Component={Wire}
            handleToolbarClick={handleToolbarClick}
            initialPosition={{ left: 0, top: 0 }}
          ></ComponentContainer>
          <ComponentContainer
            Component={Lightbulb}
            handleToolbarClick={handleToolbarClick}
            initialPosition={{ left: 0, top: 0 }}
          ></ComponentContainer>
        </Toolbar>
        {components}
        <Breadboard></Breadboard>
      </div>
    </>
  );
}

export default App;
