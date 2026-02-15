import { useState, useRef, useEffect, useContext } from "react";
import { handleDrag, handleDrop, locateNearestTerminal } from "../utils.js";
import "./Pin.css";
import { TerminalContext } from "../Contexts.jsx";
import { PIN_RADIUS } from "../constants.js";

function Pin({ parentHandlePointerEvent, mounted, unmountedPosition, pinRef }) {
  const [position, setPosition] = useState({
    left: unmountedPosition.left,
    top: unmountedPosition.top,
  });
  const documentRef = useRef(document);
  const terminalPositions = useContext(TerminalContext);

  function handlePointerDown(e) {
    handleDrag(e, documentRef, [handlePointerMove, handlePointerUp]);
  }

  function handlePointerMove(e) {
    setPosition({
      left: e.clientX - PIN_RADIUS,
      top: e.clientY - PIN_RADIUS,
    });

    if (parentHandlePointerEvent) {
      parentHandlePointerEvent(e.clientX, e.clientY);
    }
  }

  function handlePointerUp(e) {
    const nearestPosition = locateNearestTerminal(
      e.clientX,
      e.clientY,
      terminalPositions,
    );

    setPosition({
      left: nearestPosition.left - PIN_RADIUS,
      top: nearestPosition.top - PIN_RADIUS,
    });

    if (parentHandlePointerEvent) {
      parentHandlePointerEvent(nearestPosition.left, nearestPosition.top);
    }

    handleDrop(documentRef, [handlePointerMove, handlePointerUp]);
  }

  useEffect(() => {
    if (mounted) {
      const nearestPosition = locateNearestTerminal(
        unmountedPosition.left,
        unmountedPosition.top,
        terminalPositions,
      );

      setPosition({
        left: nearestPosition.left - PIN_RADIUS,
        top: nearestPosition.top - PIN_RADIUS,
      });

      if (parentHandlePointerEvent) {
        parentHandlePointerEvent(nearestPosition.left, nearestPosition.top);
      }
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) {
      setPosition({
        left: unmountedPosition.left - PIN_RADIUS,
        top: unmountedPosition.top - PIN_RADIUS,
      });
    }
  }, [unmountedPosition]);

  return (
    <div
      className="pin"
      style={{
        left: position.left,
        top: position.top,
      }}
      ref={pinRef}
      onPointerDown={mounted ? handlePointerDown : null}
    ></div>
  );
}

export default Pin;
