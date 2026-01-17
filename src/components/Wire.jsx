import { useState, useEffect, useRef } from "react";
import Pin from "./Pin.jsx";
import Line from "./Line.jsx";
import "./Wire.css";

function Wire({ mounted, unmountedPosition, inToolbar }) {
  const initialLength = 50;
  const [position, setPosition] = useState({
    x1: unmountedPosition.left,
    x2: unmountedPosition.left,
    y1: unmountedPosition.top,
    y2: unmountedPosition.top + initialLength,
  });

  function handlePin1PointerEvent(x, y) {
    setPosition((position) => ({ ...position, x1: x, y1: y }));
  }

  function handlePin2PointerEvent(x, y) {
    setPosition((position) => ({ ...position, x2: x, y2: y }));
  }

  useEffect(() => {
    if (!mounted) {
      setPosition({
        x1: unmountedPosition.left,
        x2: unmountedPosition.left,
        y1: unmountedPosition.top,
        y2: unmountedPosition.top + initialLength,
      });
    }
  }, [unmountedPosition]);

  return (
    <div className="wire-container">
      <Pin
        parentHandlePointerEvent={handlePin1PointerEvent}
        mounted={mounted}
        unmountedPosition={unmountedPosition}
        inToolbar={inToolbar}
      ></Pin>
      <Line position={position}></Line>
      <Pin
        parentHandlePointerEvent={handlePin2PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top + initialLength,
        }}
        inToolbar={inToolbar}
      ></Pin>
    </div>
  );
}

export default Wire;
