import { useState } from "react";
import "./App.css";
import Breadboard from "./components/Breadboard.jsx";
import Toolbar from "./components/Toolbar.jsx";
import ToolContainer from "./components/ToolContainer.jsx";
import Wire from "./components/Wire.jsx";
import Lightbulb from "./components/Lightbulb.jsx";

function App() {
  const [tools, setTools] = useState([]);

  function handleToolbarClick(clientX, clientY, Tool) {
    setTools([
      ...tools,
      <ToolContainer
        Tool={Tool}
        initialPosition={{ left: clientX, top: clientY }}
      ></ToolContainer>,
    ]);
  }

  return (
    <div className="app-container">
      <Toolbar>
        <ToolContainer
          Tool={Wire}
          handleToolbarClick={handleToolbarClick}
          initialPosition={{ left: 0, top: 0 }}
        ></ToolContainer>
        <ToolContainer
          Tool={Lightbulb}
          handleToolbarClick={handleToolbarClick}
          initialPosition={{ left: 0, top: 0 }}
        ></ToolContainer>
      </Toolbar>
      {tools}
      <Breadboard></Breadboard>
    </div>
  );
}

export default App;
