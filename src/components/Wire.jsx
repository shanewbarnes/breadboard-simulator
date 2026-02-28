import { useState, useEffect, useRef } from "react";
import "./Wire.css";
import Pin from "./Pin.jsx";
import Line from "./Line.jsx";
import { INITIAL_WIRE_LENGTH } from "../constants.js";

function Wire({ mounted, unmountedPosition, parentHandlePointerDown }) {
  const [wirePosition, setWirePosition] = useState({
    x1: unmountedPosition.left,
    x2: unmountedPosition.left,
    y1: unmountedPosition.top,
    y2: unmountedPosition.top,
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
      x1: pinRefs[0].current.getBoundingClientRect().left,
      x2: pinRefs[1].current.getBoundingClientRect().left,
      y1: pinRefs[0].current.getBoundingClientRect().top,
      y2: pinRefs[1].current.getBoundingClientRect().top,
    });
  }, []);

  return (
    <div
      className="wire-container"
      onPointerDown={!mounted ? parentHandlePointerDown : null}
    >
      <Pin
        parentHandlePointerEvent={handlePin1PointerEvent}
        mounted={mounted}
        unmountedPosition={unmountedPosition}
        pinRef={pinRefs[0]}
      ></Pin>
      <Line position={wirePosition}
            color={"red"}></Line>
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
