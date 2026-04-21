import { useState, useRef, useEffect, useContext } from "react";
import { handleDrag, handleDrop, locateNearestTerminal, search } from "../utils.js";
import "./Pin.css";
import { TerminalContext } from "../Contexts.jsx";
import { PIN_RADIUS } from "../constants.js";

function Pin({ parentHandlePointerEvent, mounted, unmountedPosition, pinRef }) {
  const [position, setPosition] = useState({
    left: unmountedPosition.left,
    top: unmountedPosition.top,
  });
  const documentRef = useRef(document);
  const terminals = useContext(TerminalContext);
  const [terminal, setTerminal] = useState(null);

  function handlePointerDown(e) {
    terminal.handleSignal(false);
    terminal.handleNeighbor(null);
    handleDrag(e, documentRef, [handlePointerMove, handlePointerUp]);
  }

  function handlePointerMove(e) {
    setPosition({
      left: e.clientX - PIN_RADIUS,
      top: e.clientY - PIN_RADIUS,
    });

    if (parentHandlePointerEvent) {
      parentHandlePointerEvent({ position: { left: e.clientX, top: e.clientY } });
    }
  }

  function handlePointerUp(e) {
    const nearestTerminal = locateNearestTerminal(
      e.clientX,
      e.clientY,
      terminals,
    );

    setPosition({
      left: nearestTerminal.terminal.position.left - PIN_RADIUS,
      top: nearestTerminal.terminal.position.top - PIN_RADIUS,
    });

    if (parentHandlePointerEvent) {
      parentHandlePointerEvent(nearestTerminal);
    }

    handleDrop(documentRef, [handlePointerMove, handlePointerUp]);

    setTerminal(terminals.get(nearestTerminal.id));
  }

  useEffect(() => {
    if (mounted) {
      const nearestTerminal = locateNearestTerminal(
        unmountedPosition.left,
        unmountedPosition.top,
        terminals,
      );

      setPosition({
        left: nearestTerminal.terminal.position.left - PIN_RADIUS,
        top: nearestTerminal.terminal.position.top - PIN_RADIUS,
      });

      if (parentHandlePointerEvent) {
        parentHandlePointerEvent(nearestTerminal);
      }
      
      setTerminal(terminals.get(nearestTerminal.id));
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
  
  useEffect(() => {
    if (mounted) {
      search(terminals);
    }
  }, [terminal]);

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
