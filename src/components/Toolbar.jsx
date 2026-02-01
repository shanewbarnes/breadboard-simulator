import "./Toolbar.css";
import ComponentContainer from "./ComponentContainer.jsx";
import Wire from "./Wire.jsx";
import Lightbulb from "./Lightbulb.jsx";

function Toolbar({ children }) {
  return (
    <aside className="toolbar-container">
      <div className="toolbar">{children}</div>
    </aside>
  );
}

export default Toolbar;
