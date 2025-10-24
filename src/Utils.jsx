export function handleDrag(e, documentRef, { handlePointerMove, handlePointerUp }) {
  //  NOTE: preventDefault ensures that pointerup event fires
  e.preventDefault();

  documentRef.current.addEventListener("pointermove", handlePointerMove);
  documentRef.current.addEventListener("pointerup", handlePointerUp);
}

export function handleDrop(documentRef, { handlePointerMove, handlePointerUp }) {
  documentRef.current.removeEventListener("pointermove", handlePointerMove);
  documentRef.current.removeEventListener("pointerup", handlePointerUp);
}
