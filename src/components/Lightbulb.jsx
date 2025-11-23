import { useState, useEffect } from "react";
import "./Lightbulb.css";
import "./Wire.css";
import Pin from "./Pin.jsx";

function Lightbulb({ mounted, unmountedPosition }) {
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
  const wireColor = "black";
  const strokeWidth = 8;
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
    setBulbPosition(() => ({ left: centerX - bulbRadius, top: centerY - bulbRadius }));
  }, [wirePosition]);

  return (
    <div className="lightbulb-container">
      <Pin
        parentHandlePointerEvent={handlePin1PointerEvent}
        mounted={mounted}
        unmountedPosition={unmountedPosition}
      ></Pin>
      <div
        className="lightbulb"
        style={{
          left: mounted ? bulbPosition.left : unmountedPosition.left,
          top: mounted ? bulbPosition.top : unmountedPosition.top,
        }}
      ></div>
      <svg className="line-svg">
        <line
          x1={wirePosition.x1}
          x2={wirePosition.x2}
          y1={wirePosition.y1}
          y2={wirePosition.y2}
          stroke={wireColor}
          strokeWidth={strokeWidth}
        />
      </svg>
      <Pin
        parentHandlePointerEvent={handlePin2PointerEvent}
        mounted={mounted}
        unmountedPosition={unmountedPosition}
      ></Pin>
    </div>
  );
}

export default Lightbulb;
