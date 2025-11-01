import { useState, useRef } from "react";
import { handleDrag, handleDrop } from "../Utils.jsx";

function ComponentContainer({ Component }) {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [mounted, setMounted] = useState(false);
  const documentRef = useRef(document);

  function handlePointerDown(e) {
    handleDrag(e, documentRef, [handlePointerMove, handlePointerUp]);
  }

  function handlePointerMove(e) {
    setPosition({ left: e.clientX, top: e.clientY });
  }

  function handlePointerUp(e) {
    handleDrop(documentRef, [handlePointerMove, handlePointerUp]);
    setPosition({ left: e.clientX, top: e.clientY });
    setMounted(true);
  }

  return (
    <div
      className="component-container"
      style={{ left: position.left, top: position.top }}
      onPointerDown={!mounted ? handlePointerDown : null}
    >
      <Component mounted={mounted} unmountedPosition={position}></Component>
    </div>
  );
}

export default ComponentContainer;
