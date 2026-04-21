import { useState, useEffect, useRef, useContext } from "react";
import "./Lightbulb.css";
import "./Wire.css";
import Pin from "./Pin.jsx";
import Line from "./Line.jsx";
import { TerminalContext } from "../Contexts.jsx";
import { LIGHTBULB_RADIUS } from "../constants.js";

function Lightbulb({ mounted, unmountedPosition, parentHandlePointerDown }) {
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
  const [color, setColor] = useState("darkred");
  const pinRefs = [useRef(null), useRef(null)];
  const wireTerminals = [useRef(null), useRef(null)];
  const terminals = useContext(TerminalContext);

  function handlePin1PointerEvent(e) {
    if (e.terminal) {
      if (wireTerminals[0].current) {
        terminals.get(wireTerminals[0].current.id).handleComponent = null;
      }

      terminals.get(e.id).handleComponent = handleComponent;

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
      if (wireTerminals[1].current) {
        terminals.get(wireTerminals[1].current.id).handleComponent = null;
      }

      terminals.get(e.id).handleComponent = handleComponent;

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
  
  function handleComponent(signal) {
    setColor(signal ? "red" : "darkred");
  }

  useEffect(() => {
    let centerX = (wirePosition.x1 + wirePosition.x2) / 2;
    let centerY = (wirePosition.y1 + wirePosition.y2) / 2;

    setBulbPosition(() => ({
      left: centerX - LIGHTBULB_RADIUS,
      top: centerY - LIGHTBULB_RADIUS,
    }));
  }, [wirePosition]);

  useEffect(() => {
    setBulbPosition({
      left: unmountedPosition.left - LIGHTBULB_RADIUS,
      top: unmountedPosition.top,
    });
  }, [unmountedPosition]);
  
  return (
    <div
      className="lightbulb-container"
      onPointerDown={!mounted ? parentHandlePointerDown : null}
    >
      <Pin
        parentHandlePointerEvent={handlePin1PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top,
        }}
        pinRef={pinRefs[0]}
      ></Pin>
      <div
        className="lightbulb"
        style={{
          left: bulbPosition.left,
          top: bulbPosition.top,
          backgroundColor: color,
        }}
      ></div>
      <Line position={wirePosition} color={"black"}></Line>
      <Pin
        parentHandlePointerEvent={handlePin2PointerEvent}
        mounted={mounted}
        unmountedPosition={{
          left: unmountedPosition.left,
          top: unmountedPosition.top + LIGHTBULB_RADIUS * 2,
        }}
        pinRef={pinRefs[1]}
      ></Pin>
    </div>
  );
}

export default Lightbulb;
