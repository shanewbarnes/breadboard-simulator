import { useState, useRef } from "react";
import { handleDrag, handleDrop } from "../utils.js";
import "./ComponentContainer.css";
import {
  COMPONENT_CONTAINER_HEIGHT,
  INITIAL_WIRE_LENGTH,
} from "../constants.js";

function ComponentContainer({
  Component,
  handleToolbarClick,
  initialPosition,
}) {
  const centerAdjustment =
    COMPONENT_CONTAINER_HEIGHT / 2 - INITIAL_WIRE_LENGTH / 2;
  const inToolbar = handleToolbarClick !== undefined;
  const [position, setPosition] = useState({
    left: initialPosition.left,
    top: initialPosition.top + (inToolbar ? centerAdjustment : 0),
  });
  const [mounted, setMounted] = useState(false);
  const documentRef = useRef(document);

  function handlePointerDown(e) {
    if (inToolbar) {
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
    >
      <Component
        mounted={mounted}
        unmountedPosition={position}
        handlePointerDown={handlePointerDown}
      ></Component>
    </div>
  );
}

export default ComponentContainer;
