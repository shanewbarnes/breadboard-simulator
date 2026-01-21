import "./App.css";
import Breadboard from "./components/Breadboard.jsx";
import Toolbar from "./components/Toolbar.jsx";
import ComponentContainer from "./components/ComponentContainer.jsx";
import Wire from "./components/Wire.jsx";
import Lightbulb from "./components/Lightbulb.jsx";

function App() {
  return (
    <>
      <div className="app-container">
        <Toolbar>
          <ComponentContainer Component={Wire}></ComponentContainer>
        </Toolbar>
        <Breadboard></Breadboard>
      </div>
    </>
  );
}

export default App;
