import { useState, useRef, useContext } from "react";
import { addDragDropEvents, removeDragDropEvents } from "../Utils.jsx";
import { TerminalContext } from "../Contexts.jsx";
import "./Pin.css";

function Pin({ parentHandlePointerEvent }) {
  const pin = useRef(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const documentRef = useRef(document);
  const terminalPositions = useContext(TerminalContext);
  let pinRadius;

  function handlePointerDown(e) {
    pin.current = e.target;
    pinRadius = pin.current.offsetWidth / 2;

    handleDrag(e, documentRef, { handlePointerMove, handlePointerUp });
  }

  function handlePointerMove(e) {
    setPosition({
      left: e.clientX - pinRadius,
      top: e.clientY - pinRadius,
    });

    if (parentHandlePointerEvent) {
      parentHandlePointerEvent(e.clientX, e.clientY);
    }
  }

  function handlePointerUp(e) {
    let distance;
    let minDistance = Infinity;
    let minPosition;

    //  BUG: sometimes this does not find the closest terminal
    terminalPositions.forEach((terminalPosition) => {
      distance =
        (e.clientX - terminalPosition.left) ** 2 +
        ((e.clientY - terminalPosition.top) ** 2) ** 0.5;

      if (distance < minDistance) {
        minDistance = distance;
        minPosition = {
          left: terminalPosition.left,
          top: terminalPosition.top,
        };
      }
    });

    setPosition({
      left: minPosition.left - pinRadius,
      top: minPosition.top - pinRadius,
    });

    if (parentHandlePointerEvent) {
      parentHandlePointerEvent(minPosition.left, minPosition.top);
    }

    handleDrop(documentRef, { handlePointerMove, handlePointerUp });
  }

  return (
    <div
      className="pin"
      style={{ left: position.left, top: position.top }}
      onPointerDown={handlePointerDown}
    ></div>
  );
}

export default Pin;
