import { useState, useEffect } from "react";
import "./Line.css";

function Line({ position }) {
  const color = "red";
  const strokeWidth = 8;

  return (
    <svg className="svg">
      <line
        x1={position.x1}
        x2={position.x2}
        y1={position.y1}
        y2={position.y2}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default Line;
