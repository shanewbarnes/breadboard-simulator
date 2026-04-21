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

export function locateNearestTerminal(clientX, clientY, terminals) {
  let distance;
  let minDistance = Infinity;
  let nearestTerminal;

  terminals.forEach((terminal, id) => {
    if (!terminal.neighbor) {
      distance =
        ((clientX - terminal.position.left) ** 2 +
          (clientY - terminal.position.top) ** 2) **
        0.5;

      if (distance < minDistance) {
        minDistance = distance;
        nearestTerminal = {
          id: id,
          terminal: terminal,
        };
      }
    }
  });

  return nearestTerminal;
}

export function search(terminals) {
  const paths = [];
  terminals.forEach((terminal, id) => {
    if (terminal.power) {
      const visited = new Set();
      const path = new Set();
      dfs(id, path, visited);
    }
  });
  
  terminals.forEach((terminal, id) => {
    paths.forEach((path) => {
      if (path.has(id)) {
        terminal.handleSignal(true);
        terminal.handleComponent && terminal.handleComponent(true);
      } else {
        terminal.handleSignal(false);
        terminal.handleComponent && terminal.handleComponent(false);
      }
    });
    
    if (paths.length === 0) {
      terminal.handleSignal(false);
      terminal.handleComponent && terminal.handleComponent(false);
    }
  });
  
  function dfs(id, path, visited) {
    const terminal = terminals.get(id);

    if (terminal && terminal.ground) {
      paths.push(path);
      return;
    }

    path.add(id);
    visited.add(id);

    terminal.stripTerminals.forEach((stripTerminalId) => {
      if (!visited.has(stripTerminalId)) {
        dfs(stripTerminalId, path, visited);
      }
    });
    
    if (terminal.neighbor && !visited.has(terminal.neighbor.id)) {
      dfs(terminal.neighbor.id, path, visited);
    }
  }
}
