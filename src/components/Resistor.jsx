import { useState, useRef, useEffect } from "react";
import "./Resistor.css";
import Pin from "./Pin.jsx";
import Line from "./Line.jsx";
import { INITIAL_WIRE_LENGTH } from "../constants.js";

function Resistor({ mounted, unmountedPosition, parentHandlePointerDown }) {
  const [resistorPosition, setResistorPosition] = useState({
    left: unmountedPosition.left,
    top: unmountedPosition.top,
  });
  const [resistorAngle, setResistorAngle] = useState(90);
  const [wirePosition, setWirePosition] = useState({
    x1: unmountedPosition.left,
    x2: unmountedPosition.left,
    y1: unmountedPosition.top,
    y2: unmountedPosition.top,
  });
  const pinRefs = [useRef(null), useRef(null)];
  const wireTerminals = [useRef(null), useRef(null)];
  const resistorHeight = 25;

  function handlePin1PointerEvent(e) {
    if (e.terminal) {
      const terminal = e;

      setWirePosition((wirePosition) => ({
        ...wirePosition,
        x1: terminal.terminal.position.left,
        y1: terminal.terminal.position.top,
      }));

      wireTerminals[0].current = terminal;
      
      if (wireTerminals[1].current) {
        terminal.terminal.handleNeighbor(wireTerminals[1].current);
        wireTerminals[1].current.terminal.handleNeighbor(terminal);
      }
    } else {
      setWirePosition((wirePosition) => ({
        ...wirePosition,
        x1: e.position.left,
        y1: e.position.top,
      }));
    }
  }

  function handlePin2PointerEvent(e) {
    if (e.terminal) {
      const terminal = e;

      setWirePosition((wirePosition) => ({
        ...wirePosition,
        x2: terminal.terminal.position.left,
        y2: terminal.terminal.position.top,
      }));

      wireTerminals[1].current = terminal;

      if (wireTerminals[0].current) {
        terminal.terminal.handleNeighbor(wireTerminals[0].current);
        wireTerminals[0].current.terminal.handleNeighbor(terminal);
      }
    } else {
      setWirePosition((wirePosition) => ({
        ...wirePosition,
        x2: e.position.left,
        y2: e.position.top,
      }));
    }
  }

  useEffect(() => {
    let centerX = (wirePosition.x1 + wirePosition.x2) / 2;
    let centerY = (wirePosition.y1 + wirePosition.y2) / 2;

    let dx = wirePosition.x2 - wirePosition.x1;
    let dy = wirePosition.y2 - wirePosition.y1;
    let lineAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    let lineLength = (dx ** 2 + dy ** 2) ** 0.5;

    setResistorPosition({
      left: centerX + ((INITIAL_WIRE_LENGTH / 2) * dx) / lineLength,
      top: centerY + ((INITIAL_WIRE_LENGTH / 2) * dy) / lineLength,
    });

    setResistorAngle(lineAngle);
  }, [wirePosition]);

  useEffect(() => {
    setResistorPosition({
      left: unmountedPosition.left,
      top: unmountedPosition.top,
    });

    setResistorAngle(0);
  }, [unmountedPosition]);

  return (
    <div
      className="resistor-container"
      onPointerDown={!mounted ? parentHandlePointerDown : null}
    >
      {mounted && (
        <>
          <Pin
            parentHandlePointerEvent={handlePin1PointerEvent}
            mounted={mounted}
            unmountedPosition={unmountedPosition}
            pinRef={pinRefs[0]}
          ></Pin>
          <Line position={wirePosition} color={"black"}></Line>
          <Pin
            parentHandlePointerEvent={handlePin2PointerEvent}
            mounted={mounted}
            unmountedPosition={{
              left: unmountedPosition.left,
              top: unmountedPosition.top + INITIAL_WIRE_LENGTH,
            }}
            pinRef={pinRefs[1]}
          ></Pin>
        </>
      )}
      <div
        className="resistor"
        style={{
          left: resistorPosition.left,
          top: resistorPosition.top,
          transform: `rotate(${resistorAngle}deg)`,
        }}
      >
        <div className="resistor-ball">
          <div className="resistor-strip blue"></div>
        </div>
        <div className="resistor-middle">
          <div className="resistor-strip black"></div>
          <div className="resistor-strip red"></div>
        </div>
        <div className="resistor-ball" style={{ top: resistorHeight }}>
          <div className="resistor-strip red"></div>
        </div>
      </div>
    </div>
  );
}

export default Resistor;
