import { useState, useEffect } from "react";
import { TerminalContext } from "../Contexts.jsx";
import Pin from "./Pin.jsx";
import "./Wire.css";

function Wire({ mounted, unmountedPosition }) {
  const initialLength = 50;
  const pinRadius = 10;
  const [position, setPosition] = useState({
    x1: unmountedPosition.left + pinRadius,
    x2: unmountedPosition.left + pinRadius,
    y1: unmountedPosition.top + pinRadius,
    y2: unmountedPosition.top + initialLength + pinRadius,
  });
  const color = "red";
  const strokeWidth = "8";

  function handlePin1PointerEvent(x, y) {
    setPosition((position) => ({ ...position, x1: x, y1: y }));
  }

  function handlePin2PointerEvent(x, y) {
    setPosition((position) => ({ ...position, x2: x, y2: y }));
  }

  useEffect(() => {
    if (!mounted) {
      setPosition({
        x1: unmountedPosition.left + pinRadius,
        x2: unmountedPosition.left + pinRadius,
        y1: unmountedPosition.top + pinRadius,
        y2: unmountedPosition.top + initialLength + pinRadius,
      });
    }
  }, [unmountedPosition]);

  return (
    <div className="wire-container">
      <Pin
        parentHandlePointerEvent={handlePin1PointerEvent}
        mounted={mounted}
        unmountedPosition={unmountedPosition}
      ></Pin>
      <svg className="line-svg">
        <line
          x1={position.x1}
          x2={position.x2}
          y1={position.y1}
          y2={position.y2}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>
      <Pin
        parentHandlePointerEvent={handlePin2PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top + initialLength,
        }}
      ></Pin>
    </div>
  );
}

export default Wire;
