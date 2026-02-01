import { useState, useRef } from "react";
import { handleDrag, handleDrop } from "../Utils.jsx";
import "./ComponentContainer.css";

function ComponentContainer({
  Component,
  handleToolbarClick,
  initialPosition,
}) {
  const [position, setPosition] = useState({
    left: initialPosition.left,
    top: initialPosition.top,
  });
  const [mounted, setMounted] = useState(false);
  const documentRef = useRef(document);

  function handlePointerDown(e) {
    if (handleToolbarClick) {
      handleToolbarClick(e.clientX, e.clientY, Component);
    } else {
      handleDrag(e, documentRef, [handlePointerMove, handlePointerUp]);
    }
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
      onPointerDown={!mounted ? handlePointerDown : null}
    >
      <Component mounted={mounted} unmountedPosition={position}></Component>
    </div>
  );
}

export default ComponentContainer;
