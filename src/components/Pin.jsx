import { useState, useRef, useEffect, useContext } from "react";
import { handleDrag, handleDrop, locateNearestTerminal } from "../Utils.jsx";
import { TerminalContext } from "../Contexts.jsx";
import "./Pin.css";

function Pin({ parentHandlePointerEvent, mounted }) {
  const pinRef = useRef(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const documentRef = useRef(document);
  const terminalPositions = useContext(TerminalContext);
  let pinRadius;

  function handlePointerDown(e) {
    handleDrag(e, documentRef, [ handlePointerMove, handlePointerUp ]);
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
    const nearestPosition = locateNearestTerminal(e.clientX, e.clientY, terminalPositions);

    setPosition({
      left: nearestPosition.left - pinRadius,
      top: nearestPosition.top - pinRadius,
    });

    if (parentHandlePointerEvent) {
      parentHandlePointerEvent(nearestPosition.left, nearestPosition.top);
    }

    handleDrop(documentRef, [ handlePointerMove, handlePointerUp ]);
  }

  useEffect(() => {
    pinRadius = pinRef.current.offsetWidth / 2;
  });

  return (
    <div
      className="pin"
      style={{ left: position.left, top: position.top }}
      ref={pinRef}
      onPointerDown={mounted ? handlePointerDown : null}
    ></div>
  );
}

export default Pin;
