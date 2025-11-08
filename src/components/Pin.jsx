import { useState, useRef, useEffect, useContext } from "react";
import { handleDrag, handleDrop, locateNearestTerminal } from "../Utils.jsx";
import { TerminalContext } from "../Contexts.jsx";
import "./Pin.css";

/*  NOTE: maybe split pin into mounted and unmounted types */
function Pin({ parentHandlePointerEvent, mounted, unmountedPosition }) {
  const pinRef = useRef(null);
  const [position, setPosition] = useState({
    left: unmountedPosition.left,
    top: unmountedPosition.top,
  });
  const documentRef = useRef(document);
  const terminalPositions = useContext(TerminalContext);
  /*  TODO: modify this a size changes */
  const pinRadius = useRef(10);

  function handlePointerDown(e) {
    handleDrag(e, documentRef, [handlePointerMove, handlePointerUp]);
  }

  function handlePointerMove(e) {
    setPosition({
      left: e.clientX - pinRadius.current,
      top: e.clientY - pinRadius.current,
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
      left: nearestPosition.left - pinRadius.current,
      top: nearestPosition.top - pinRadius.current,
    });

    if (parentHandlePointerEvent) {
      parentHandlePointerEvent(nearestPosition.left, nearestPosition.top);
    }

    handleDrop(documentRef, [handlePointerMove, handlePointerUp]);
  }

  useEffect(() => {
    if (mounted === true) {
      const nearestPosition = locateNearestTerminal(
        unmountedPosition.left,
        unmountedPosition.top,
        terminalPositions,
      );

      setPosition({
        left: nearestPosition.left - pinRadius.current,
        top: nearestPosition.top - pinRadius.current,
      });

      if (parentHandlePointerEvent) {
        parentHandlePointerEvent(nearestPosition.left, nearestPosition.top);
      }
    }
  }, [mounted]);

  useEffect(() => {
    pinRadius.current = pinRef.current.offsetWidth / 2;
  }, []);

  return (
    <div
      className="pin"
      style={{
        left: mounted ? position.left : unmountedPosition.left,
        top: mounted ? position.top : unmountedPosition.top,
      }}
      ref={pinRef}
      onPointerDown={mounted ? handlePointerDown : null}
    ></div>
  );
}

export default Pin;
