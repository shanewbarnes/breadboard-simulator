import { useState, useRef, useEffect, useContext } from "react";
import { handleDrag, handleDrop, locateNearestTerminal } from "../Utils.jsx";
import { TerminalContext } from "../Contexts.jsx";
import "./Pin.css";

/*  NOTE: maybe split pin into mounted and unmounted types */
function Pin({ parentHandlePointerEvent, mounted, unmountedPosition, pinRef }) {
  /*  TODO: modify this as size changes */
  const pinRadius = useRef(10);
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
    if (mounted) {
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
    if (pinRef) {
      pinRadius.current = pinRef.current.offsetWidth / 2;
    }
  }, []);

  return (
    <div
      className="pin"
      style={{
        left: mounted
          ? position.left
          : unmountedPosition.left - pinRadius.current,
        top: mounted ? position.top : unmountedPosition.top - pinRadius.current,
      }}
      ref={pinRef}
      onPointerDown={mounted ? handlePointerDown : null}
    ></div>
  );
}

export default Pin;
