import { useState, useEffect } from "react";
import "./Lightbulb.css";
import "./Wire.css";
import Pin from "./Pin.jsx";
import Line from "./Line.jsx";
import { LIGHTBULB_RADIUS } from "../constants.js";

function Lightbulb({ mounted, unmountedPosition, handlePointerDown }) {
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
      left: centerX - LIGHTBULB_RADIUS,
      top: centerY - LIGHTBULB_RADIUS,
    }));
  }, [wirePosition]);

  return (
    <div
      className="lightbulb-container"
      onPointerDown={!mounted ? handlePointerDown : null}
    >
      <Pin
        parentHandlePointerEvent={handlePin1PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top,
        }}
      ></Pin>
      <div
        className="lightbulb"
        style={{
          left: mounted
            ? bulbPosition.left
            : unmountedPosition.left - LIGHTBULB_RADIUS,
          top: mounted ? bulbPosition.top : unmountedPosition.top,
        }}
      ></div>
      <Line position={wirePosition}></Line>
      <Pin
        parentHandlePointerEvent={handlePin2PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top + LIGHTBULB_RADIUS * 2,
        }}
      ></Pin>
    </div>
  );
}

export default Lightbulb;
