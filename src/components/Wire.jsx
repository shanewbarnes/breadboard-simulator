import { useState, useEffect, useRef } from "react";
import Pin from "./Pin.jsx";
import Line from "./Line.jsx";
import "./Wire.css";

function Wire({ mounted, unmountedPosition, handlePointerDown }) {
  const initialLength = 50;
  const [position, setPosition] = useState({
    x1: unmountedPosition.left,
    x2: unmountedPosition.left,
    y1: unmountedPosition.top,
    y2: unmountedPosition.top + initialLength,
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
        y2: unmountedPosition.top + initialLength,
      });
    }
  }, [unmountedPosition]);

  useEffect(() => {
    const pinRadius = pinRefs[0].current.offsetWidth / 2;

    setWirePosition({
      x1: pinRefs[0].current.getBoundingClientRect().left + pinRadius,
      x2: pinRefs[1].current.getBoundingClientRect().left + pinRadius,
      y1: pinRefs[0].current.getBoundingClientRect().top + pinRadius,
      y2: pinRefs[1].current.getBoundingClientRect().top + pinRadius,
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
          top: unmountedPosition.top + initialLength,
        }}
        pinRef={pinRefs[1]}
      ></Pin>
    </div>
  );
}

export default Wire;
