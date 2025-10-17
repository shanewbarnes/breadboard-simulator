import { useState } from "react";
import { TerminalContext } from "../Contexts.jsx";
import Pin from "./Pin.jsx"
import "./Wire.css";

function Wire() {
  const [position, setPosition] = useState({ x1: 0, x2: 0, y1: 0, y2: 0 });
  const color = "red";

  function handlePin1PointerEvent(x, y) {
    setPosition({ ...position, x1: x, y1: y });
  }

  function handlePin2PointerEvent(x, y) {
    setPosition({ ...position, x2: x, y2: y });
  }

  return (
    <div className="wire-container">
      <Pin parentHandlePointerEvent={handlePin1PointerEvent}></Pin>
      <svg className="wire">
        <line
          x1={position.x1}
          x2={position.x2}
          y1={position.y1}
          y2={position.y2}
          stroke={color}
          strokeWidth="6"
        />
      </svg>
      <Pin parentHandlePointerEvent={handlePin2PointerEvent}></Pin>
    </div>
  );
}

export default Wire;
