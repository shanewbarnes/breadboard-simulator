import { useState, useRef, useContext, useEffect } from "react";
import "./Breadboard.scss";
import { TerminalContext } from "../Contexts.jsx";

/*  NOTE: all of the variabes in these components need to be converted to references */

function Breadboard() {
  const abcdeLabels = ["e", "d", "c", "b", "a"];
  const fghijLabels = ["j", "i", "h", "g", "f"];

  return (
    <div className="breadboard-container">
      <div className="breadboard">
        <BusStrips></BusStrips>
        <TerminalStrips
          letterLabels={fghijLabels}
          topStripsFlag={true}
        ></TerminalStrips>
        <div id="divider"></div>
        <TerminalStrips
          letterLabels={abcdeLabels}
          topStripsFlag={false}
        ></TerminalStrips>
        <BusStrips></BusStrips>
      </div>
    </div>
  );
}

function BusStrips() {
  let chargeRedColor = "red";
  let chargeBlueColor = "blue";

  return (
    <div className="outer-bus-container">
      <ChargeSymbols
        chargeRedColor={chargeRedColor}
        chargeBlueColor={chargeBlueColor}
      ></ChargeSymbols>
      <div className="inner-bus-container">
        <hr className="power-line" style={{ borderColor: chargeBlueColor }} />
        <div className="bus-strips">
          <BusStrip ground={true} power={false}></BusStrip>
          <BusStrip ground={false} power={true}></BusStrip>
        </div>
        <hr className="power-line" style={{ borderColor: chargeRedColor }} />
      </div>
      <ChargeSymbols
        chargeRedColor={chargeRedColor}
        chargeBlueColor={chargeBlueColor}
      ></ChargeSymbols>
    </div>
  );
}

/*  BUG: unique key issue */
function BusStrip({ ground, power }) {
  const groupCount = 10;
  const terminalsPerGroup = 5;
  const [signal, setSignal] = useState(power);

  function handleSignal(signal) {
    setSignal(signal);
  }

  return (
    <div className="bus-strip">
      {Array(groupCount).fill(
        <div className="bus-group">
          {Array(terminalsPerGroup).fill(
            <Terminal
              signal={power}
              ground={ground}
              power={power}
              handleSignal={handleSignal}
            ></Terminal>,
          )}
        </div>,
      )}
    </div>
  );
}

function ChargeSymbols({ chargeRedColor, chargeBlueColor }) {
  return (
    <div className="charge-symbols">
      <div className="charge-symbol text" style={{ color: chargeBlueColor }}>
        &minus;
      </div>
      <div className="charge-symbol text" style={{ color: chargeRedColor }}>
        &#43;
      </div>
    </div>
  );
}

function TerminalStrips({ letterLabels, topStripsFlag }) {
  let stripsCount = 63;

  return (
    <div className="terminal-strips">
      <LetterLabels
        letterLabels={letterLabels}
        topStripsFlag={topStripsFlag}
      ></LetterLabels>
      {Array.from({ length: stripsCount }).map((_, index) => (
        <TerminalStrip
          numberLabel={index + 1}
          topStripsFlag={topStripsFlag}
        ></TerminalStrip>
      ))}
      <LetterLabels
        letterLabels={letterLabels}
        topStripsFlag={topStripsFlag}
      ></LetterLabels>
    </div>
  );
}

/*  BUG: unique key issue */
function LetterLabels({ letterLabels, topStripsFlag }) {
  return (
    <div className="letters text">
      {topStripsFlag && <div className="spacer"></div>}
      {letterLabels.map((letter) => (
        <strong className="letter">{letter}</strong>
      ))}
      {!topStripsFlag && <div className="spacer"></div>}
    </div>
  );
}

function TerminalStrip({ numberLabel, topStripsFlag }) {
  const [signal, setSignal] = useState(false);
  const terminals = useContext(TerminalContext);
  const terminalKeys = useRef(new Set());
  const terminalsPerStrip = 5;

  function handleSignal(signal) {
    terminalKeys.current.forEach((key) => {
      terminals.set(key, { ...terminals.get(key), signal: signal });
    });
    setSignal(signal);
  }

  function addTerminalKey(key) {
    terminalKeys.current.add(key);
  }

  useEffect(() => {
    if (terminalKeys.current.size === terminalsPerStrip) {
      terminalKeys.current.forEach((i) => {
        terminalKeys.current.forEach((j) => {
          if (i !== j) {
            terminals.get(i).stripTerminals.add(j);
          }
        });
      });
    }
  }, [terminalKeys.current.size]);
    
  return (
    <div className="terminal-strip">
      {topStripsFlag &&
        (numberLabel === 1 || numberLabel % 5 === 0 ? (
          <div className="number text">{numberLabel.toString()}</div>
        ) : (
          <div className="spacer"></div>
        ))}
      {Array(terminalsPerStrip).fill(
        <Terminal
          signal={signal}
          ground={false}
          power={false}
          handleSignal={handleSignal}
          addTerminalKey={addTerminalKey}
        ></Terminal>,
      )}
      {!topStripsFlag &&
        (numberLabel === 1 || numberLabel % 5 === 0 ? (
          <div className="number text">{numberLabel.toString()}</div>
        ) : (
          <div className="spacer"></div>
        ))}
    </div>
  );
}

function Terminal({ signal, handleSignal, ground, power, addTerminalKey }) {
  const terminalRef = useRef(null);
  const terminalObjRef = useRef(null);
  const key = useRef(null);
  /*  TODO: need to get the terminalPositions to update when the breadboard moves */
  const terminals = useContext(TerminalContext);
  let position;
  let radius;

  function handleNeighbor(terminal) {
    terminals.set(key.current, { ...terminals.get(key.current), neighbor: terminal });
  }

  useEffect(() => {
    radius = terminalRef.current.offsetWidth / 2;

    position = {
      left: terminalRef.current.getBoundingClientRect().left + radius,
      top: terminalRef.current.getBoundingClientRect().top + radius,
    };
    
    key.current = JSON.stringify(position);
    
    terminalObjRef.current = {
      signal: signal,
      position: position,
      handleSignal: handleSignal,
      ground: ground,
      power: power,
      neighbor: null,
      stripTerminals: new Set(),
      handleComponent: null,
      handleNeighbor: handleNeighbor,
    };

    terminals.set(key.current, terminalObjRef.current);
    
    if (addTerminalKey) {
      addTerminalKey(key.current);
    }

    return () => terminals.delete(key.current);
  }, []);

  return <div className="terminal" style={{ backgroundColor: signal ? "yellow" : "black" }} ref={terminalRef}></div>;
}

export default Breadboard;
