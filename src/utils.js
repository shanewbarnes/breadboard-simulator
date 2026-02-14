export function handleDrag(
  e,
  documentRef,
  [handlePointerMove, handlePointerUp],
) {
  //  NOTE: preventDefault ensures that pointerup event fires
  if (e) {
    e.preventDefault();
  }

  documentRef.current.addEventListener("pointermove", handlePointerMove);
  documentRef.current.addEventListener("pointerup", handlePointerUp);
}

export function handleDrop(documentRef, [handlePointerMove, handlePointerUp]) {
  documentRef.current.removeEventListener("pointermove", handlePointerMove);
  documentRef.current.removeEventListener("pointerup", handlePointerUp);
}

export function locateNearestTerminal(clientX, clientY, terminalPositions) {
  let distance;
  let minDistance = Infinity;
  let nearestPosition;

  terminalPositions.forEach((terminalPosition) => {
    distance =
      ((clientX - terminalPosition.left) ** 2 +
        (clientY - terminalPosition.top) ** 2) **
      0.5;

    if (distance < minDistance) {
      minDistance = distance;
      nearestPosition = {
        left: terminalPosition.left,
        top: terminalPosition.top,
      };
    }
  });

  return nearestPosition;
}
