import { useState, useRef, useContext, useEffect } from "react";
import { TerminalContext } from "../Contexts.jsx";
import "./Breadboard.scss";

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
          <BusStrip></BusStrip>
          <BusStrip></BusStrip>
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
function BusStrip() {
  const groupCount = 10;
  const terminalsPerGroup = 5;
  let signal = false;

  return (
    <div className="bus-strip">
      {Array(groupCount).fill(
        <div className="bus-group">
          {Array(terminalsPerGroup).fill(<Terminal></Terminal>)}
        </div>,
      )}
    </div>
  );
}

function ChargeSymbols({ chargeRedColor, chargeBlueColor }) {
  return (
    <div className="charge-symbols">
      <div className="charge-symbol" style={{ color: chargeBlueColor }}>
        &minus;
      </div>
      <div className="charge-symbol" style={{ color: chargeRedColor }}>
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
    <div className="letters">
      {topStripsFlag && <div className="spacer"></div>}
      {letterLabels.map((letter) => (
        <strong className="letter">{letter}</strong>
      ))}
      {!topStripsFlag && <div className="spacer"></div>}
    </div>
  );
}

function TerminalStrip({ numberLabel, topStripsFlag }) {
  let terminalsPerStrip = 5;
  let signal = false;

  return (
    <div className="terminal-strip">
      {topStripsFlag &&
        (numberLabel === 1 || numberLabel % 5 === 0 ? (
          <div className="number">{numberLabel.toString()}</div>
        ) : (
          <div className="spacer"></div>
        ))}
      {Array(terminalsPerStrip).fill(<Terminal></Terminal>)}
      {!topStripsFlag &&
        (numberLabel === 1 || numberLabel % 5 === 0 ? (
          <div className="number">{numberLabel.toString()}</div>
        ) : (
          <div className="spacer"></div>
        ))}
    </div>
  );
}

function Terminal() {
  const terminalRef = useRef(null);
  /*  TODO: need to get the terminalPositions to update when the breadboard moves */
  const terminalPositions = useContext(TerminalContext);
  let terminalPosition;
  let terminalRadius;

  useEffect(() => {
    terminalRadius = terminalRef.current.offsetWidth / 2;

    /*  NOTE: might need to make getBoudingClientRect offsetWidth/offsetHeight to fix alignment issue */
    terminalPosition = {
      left: terminalRef.current.getBoundingClientRect().left + terminalRadius,
      top: terminalRef.current.getBoundingClientRect().top + terminalRadius,
    };

    terminalPositions.add(terminalPosition);

    return () => terminalPositions.delete(terminalPosition);
  }, []);

  return <div className="terminal" ref={terminalRef}></div>;
}

export default Breadboard;
