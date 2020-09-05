//This is the base of everything
import React, { useState } from "react";
import DisplayPanel from "./DisplayPanel";
import NumericKeys from "./NumericKeys";
// import BasicFunctions from "./BasicFunctions";

function Calculator() {
  const [panel, setPanel] = useState("");

  const numericButtons = () => {
    const numbers = [];
    for (let i = 9; i >= 0; i--) {
      numbers.push(
        <button
          className="btn btn-outline-dark mx-2"
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
      <div className="displa-panel my-2">
        <DisplayPanel Panel={panel} />
      </div>
      <div className="operations my-2">
        <button onClick={(e) => setPanel(e.target.value)} value={""} key={0}>
          AC
        </button>
        <button onClick={(e) => setPanel(panel + e.target.value)} value="+">
          +
        </button>
        <button onClick={(e) => setPanel(panel + e.target.value)} value="-">
          -
        </button>
        <button onClick={(e) => setPanel(panel + e.target.value)} value="*">
          *
        </button>
        <button onClick={(e) => setPanel(panel + e.target.value)} value="/">
          /
        </button>
      </div>
      <div className="numbers my-2">
        <NumericKeys Buttons={numericButtons()} />
      </div>
      <div className="result">
        <button
          onClick={(e) => {
            try {
              setPanel(
                String(eval(panel)).lenght > 3 &&
                  String(eval(panel)).includes(".")
                  ? String(eval(panel).toFixed(4))
                  : String(eval(panel))
              );
            } catch (err) {
              setPanel("error presione AC");
            }
          }}
          value="="
        >
          =
        </button>
      </div>

      {/* <BasicFunctions Buttons={basicFunctions()} /> */}
    </div>
  );
}

export default Calculator;
