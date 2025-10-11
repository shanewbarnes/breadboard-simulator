import { useState, useRef } from "react";
import "./Tools.css";

function Wire() {
  const [position, setPosition] = useState({ x1: 0, x2: 0, y1: 0, y2: 0 });
  const color = "red";

  function handlePin1PointerMove(e) {
    setPosition({ ...position, x1: e.clientX, y1: e.clientY });
  }

  function handlePin2PointerMove(e) {
    setPosition({ ...position, x2: e.clientX, y2: e.clientY });
  }

  return (
    <div className="wire-container">
      <Pin parentHandlePointerMove={handlePin1PointerMove}></Pin>
      <svg height="100%" width="100%">
        <line
          x1={position.x1}
          x2={position.x2}
          y1={position.y1}
          y2={position.y2}
          stroke={color}
          strokeWidth="6"
        />
      </svg>
      <Pin parentHandlePointerMove={handlePin2PointerMove}></Pin>
    </div>
  );
}

function Pin({ parentHandlePointerMove }) {
  const pin = useRef(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const documentRef = useRef(document);

  function handlePointerMove(e) {
    parentHandlePointerMove(e);
    setPosition({
      left: e.clientX - pin.current.offsetWidth / 2,
      top: e.clientY - pin.current.offsetHeight / 2,
    });
  }

  function handlePointerDown(e) {
    //  NOTE: preventDefault ensures that pointerup event fires
    e.preventDefault();

    pin.current = e.target;
    documentRef.current.addEventListener("pointermove", handlePointerMove);
    documentRef.current.addEventListener("pointerup", handlePointerUp);
  }

  function handlePointerUp(e) {
    documentRef.current.removeEventListener("pointermove", handlePointerMove);
    documentRef.current.removeEventListener("pointerup", handlePointerUp);
  }

  return (
    <div
      className="pin"
      style={{ left: position.left, top: position.top }}
      onPointerDown={handlePointerDown}
    ></div>
  );
}

function Lightbulb() {
  return <div className="lightbulb"></div>;
}

export { Wire, Lightbulb };
