import "./Toolbar.css";

function Toolbar({ children }) {
  return (
    <div className="toolbar-container">
      <aside className="toolbar">{children}</aside>
    </div>
  );
}

export default Toolbar;
