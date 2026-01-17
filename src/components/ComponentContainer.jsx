import { useState, useRef } from "react";
import { handleDrag, handleDrop } from "../Utils.jsx";
import "./ComponentContainer.css";

function ComponentContainer({ Component }) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [inToolbar, setInToolbar] = useState(true);
  const documentRef = useRef(document);
  const containerRef = useRef(null);

  function handlePointerDown(e) {
    setInToolbar(false);
    handleDrag(e, documentRef, [handlePointerMove, handlePointerUp]);
  }

  function handlePointerMove(e) {
    setPosition({ left: e.clientX, top: e.clientY });
  }

  function handlePointerUp(e) {
    setMounted(true);
    handleDrop(documentRef, [handlePointerMove, handlePointerUp]);
  }

  return (
    <div
      className="component-container"
      style={{ left: position.left, top: position.top }}
      ref={containerRef}
      onPointerDown={!mounted ? handlePointerDown : null}
    >
      <Component mounted={mounted} unmountedPosition={position} inToolbar={inToolbar}></Component>
    </div>
  );
}

export default ComponentContainer;
