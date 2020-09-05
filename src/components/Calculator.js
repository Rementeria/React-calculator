//This is the base of everything
import React, { useState } from "react";
import DisplayPanel from "./DisplayPanel";
import NumericKeys from "./NumericKeys";

function Calculator() {
  const [panel, setPanel] = useState("");

  const numericButtons = () => {
    const numbers = [];
    for (let i = 9; i >= 0; i--) {
      numbers.push(
        <button
          onClick={(e) => {
            setPanel(panel + e.target.value);
          }}
          value={i}
          key={i}
        >
          {i}
        </button>
      );
    }
    return numbers;
  };
  return (
    <div className="container center-text">
      <DisplayPanel Panel={panel} />
      <NumericKeys Buttons={numericButtons()} />
    </div>
  );
}

export default Calculator;
