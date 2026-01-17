import { useState, useEffect } from "react";
import "./Lightbulb.css";
import "./Wire.css";
import Pin from "./Pin.jsx";
import Line from "./Line.jsx";

function Lightbulb({ mounted, unmountedPosition, inToolbar }) {
  const [bulbPosition, setBulbPosition] = useState({
    left: unmountedPosition.left,
    top: unmountedPosition.top,
  });
  const [wirePosition, setWirePosition] = useState({
    x1: unmountedPosition.left,
    x2: unmountedPosition.left,
    y1: unmountedPosition.top,
    y2: unmountedPosition.top,
  });
  const bulbRadius = 20;

  function handlePin1PointerEvent(x, y) {
    setWirePosition((wirePosition) => ({ ...wirePosition, x1: x, y1: y }));
  }

  function handlePin2PointerEvent(x, y) {
    setWirePosition((wirePosition) => ({ ...wirePosition, x2: x, y2: y }));
  }

  useEffect(() => {
    let centerX = (wirePosition.x1 + wirePosition.x2) / 2;
    let centerY = (wirePosition.y1 + wirePosition.y2) / 2;

    setBulbPosition(() => ({
      left: centerX - bulbRadius,
      top: centerY - bulbRadius,
    }));
  }, [wirePosition]);

  return (
    <div className="lightbulb-container">
      <Pin
        parentHandlePointerEvent={handlePin1PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top
        }}
        inToolbar={inToolbar}
      ></Pin>
      <div
        className="lightbulb"
        style={{
          left: mounted ? bulbPosition.left : unmountedPosition.left - bulbRadius,
          top: mounted ? bulbPosition.top : unmountedPosition.top,
        }}
      ></div>
      <Line position={wirePosition}></Line>
      <Pin
        parentHandlePointerEvent={handlePin2PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top + bulbRadius * 2,
        }}
        inToolbar={inToolbar}
      ></Pin>
    </div>
  );
}

export default Lightbulb;
