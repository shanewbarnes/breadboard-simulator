import { useState, useRef } from "react";
import { handleDrag, handleDrop } from "../utils.js";
import "./ToolContainer.css";
import {
  TOOL_CONTAINER_HEIGHT,
  INITIAL_WIRE_LENGTH,
} from "../constants.js";

function ToolContainer({
  Tool,
  handleToolbarClick,
  initialPosition,
}) {
  const centerAdjustment =
    TOOL_CONTAINER_HEIGHT / 2 - INITIAL_WIRE_LENGTH / 2;
  const inToolbar = handleToolbarClick !== undefined;
  const [position, setPosition] = useState({
    left: initialPosition.left,
    top: initialPosition.top + (inToolbar ? centerAdjustment : 0),
  });
  const [mounted, setMounted] = useState(false);
  const documentRef = useRef(document);

  function handlePointerDown(e) {
    if (inToolbar) {
      handleToolbarClick(e.clientX, e.clientY, Tool);
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
      className="tool-container"
      style={{ left: position.left, top: position.top }}
    >
      <Tool
        mounted={mounted}
        unmountedPosition={position}
        handlePointerDown={handlePointerDown}
      ></Tool>
    </div>
  );
}

export default ToolContainer;
