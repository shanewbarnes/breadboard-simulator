import "./App.css";
import Breadboard from "./components/Breadboard.jsx";
import ToolsContainer from "./components/ToolsContainer.jsx";

function App() {
  return (
    <div className="app-container">
      <ToolsContainer></ToolsContainer>
      <Breadboard></Breadboard>
    </div>
  );
}

export default App;
