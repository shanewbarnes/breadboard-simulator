import { useState } from 'react'
import './Breadboard.css'

function Breadboard() {

  return (
    <div className="breadboard">
      <BusStrips></BusStrips>
      <TerminalStrips></TerminalStrips>
      <TerminalStrips></TerminalStrips>
      <BusStrips></BusStrips>
    </div>
  )
}

function BusStrips() {

  let chargeRedColor = "red";
  let chargeBlueColor = "red";

  return (
    <div className="outer-bus-container">
      <ChargeSymbols></ChargeSymbols>
      <div className="inner-bus-container">
        <hr className="power-line" style={{borderColor: "blue"}} />
        <div className="strips bus-strips">
          <BusStrip></BusStrip>
          <BusStrip></BusStrip>
        </div>
        <hr className="power-line" style={{borderColor: "red"}} />
      </div>
      <ChargeSymbols></ChargeSymbols>
    </div>
  )
}

function BusStrip() {

  const groupCount = 10;
  const terminalsPerGroup = 5;
  let signal = false;

  return (
    <div className="bus-strip">
      {Array(50).fill(<Terminal></Terminal>)}
    </div>
  )
}

function ChargeSymbols() {
  return (
    <div className="charge-symbols">
      <div className="charge-symbol" style={{color: "blue"}}>-</div>
      <div className="charge-symbol" style={{color: "red"}}>+</div>
    </div>
  )
}

function TerminalStrips() {

  const stripsCount = 63;
  const terminalsPerStrip = 5;

  return (
    <div className="strips terminal-strips">
      {Array(stripsCount).fill(<TerminalStrip terminalsPerStrip={terminalsPerStrip}></TerminalStrip>)}
    </div>
  )
}

function TerminalStrip({terminalsPerStrip}) {

  let signal = false;

  return (
    <div className="terminal-strip">
      {Array(terminalsPerStrip).fill(<Terminal></Terminal>)}
    </div>
  )
}

function Terminal() {

  return (
    <div className="terminal">
    </div>
  )
}

export default Breadboard
