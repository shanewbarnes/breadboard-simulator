import { useState, useEffect, useRef } from "react";
import "./Wire.css";
import Pin from "./Pin.jsx";
import Line from "./Line.jsx";
import { INITIAL_WIRE_LENGTH, PIN_RADIUS } from "../constants.js";

function Wire({ mounted, unmountedPosition, handlePointerDown }) {
  const [position, setPosition] = useState({
    x1: unmountedPosition.left,
    x2: unmountedPosition.left,
    y1: unmountedPosition.top,
    y2: unmountedPosition.top + INITIAL_WIRE_LENGTH,
  });
  const [wirePosition, setWirePosition] = useState({
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  });
  const pinRefs = [useRef(null), useRef(null)];

  function handlePin1PointerEvent(x, y) {
    setWirePosition((wirePosition) => ({ ...wirePosition, x1: x, y1: y }));
  }

  function handlePin2PointerEvent(x, y) {
    setWirePosition((wirePosition) => ({ ...wirePosition, x2: x, y2: y }));
  }

  useEffect(() => {
    if (!mounted) {
      setWirePosition({
        x1: unmountedPosition.left,
        x2: unmountedPosition.left,
        y1: unmountedPosition.top,
        y2: unmountedPosition.top + INITIAL_WIRE_LENGTH,
      });
    }
  }, [unmountedPosition]);

  useEffect(() => {
    setWirePosition({
      x1: pinRefs[0].current.getBoundingClientRect().left + PIN_RADIUS,
      x2: pinRefs[1].current.getBoundingClientRect().left + PIN_RADIUS,
      y1: pinRefs[0].current.getBoundingClientRect().top + PIN_RADIUS,
      y2: pinRefs[1].current.getBoundingClientRect().top + PIN_RADIUS,
    });
  }, []);

  return (
    <div
      className="wire-container"
      onPointerDown={!mounted ? handlePointerDown : null}
    >
      <Pin
        parentHandlePointerEvent={handlePin1PointerEvent}
        mounted={mounted}
        unmountedPosition={unmountedPosition}
        pinRef={pinRefs[0]}
      ></Pin>
      <Line position={wirePosition}></Line>
      <Pin
        parentHandlePointerEvent={handlePin2PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top + INITIAL_WIRE_LENGTH,
        }}
        pinRef={pinRefs[1]}
      ></Pin>
    </div>
  );
}

export default Wire;
