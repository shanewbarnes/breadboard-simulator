import "./Toolbar.css";

function Toolbar({ children }) {

  return (
    <aside className="toolbar-container">
      <div className="toolbar">
        {children}
      </div>
    </aside>
  )
}

export default Toolbar;
