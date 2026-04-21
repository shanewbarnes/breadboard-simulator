import { useState } from "react";
import Toolbar from "./Toolbar.jsx";
import ToolContainer from "./ToolContainer.jsx";
import Wire from "./Wire.jsx";
import Lightbulb from "./Lightbulb.jsx";
import Resistor from "./Resistor.jsx";

function ToolsContainer() {
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
    <>
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
        <ToolContainer
          Tool={Resistor}
          handleToolbarClick={handleToolbarClick}
          initialPosition={{ left: 0, top: 0 }}
        ></ToolContainer>
      </Toolbar>
      {tools}
    </>
  );
}

export default ToolsContainer;
