//This is the base of everything
import React, { useState } from "react";
import DisplayPanel from "./DisplayPanel";
import NumericKeys from "./NumericKeys";
import "./Calculator.css";

function Calculator({ initialValue }) {
  const [panel, setPanel] = useState(initialValue);

  const numericButtons = () => {
    const numbers = [];
    for (let i = 9; i >= 0; i--) {
      numbers.push(
        <button
          className="btn btn-outline-dark mx-2"
          onClick={(e) =>
            panel === initialValue
              ? setPanel(e.target.value)
              : setPanel(panel + e.target.value)
          }
          value={i}
          key={i}
        >
          {i}
        </button>
      );
    }
    return numbers;
  };

  const arithmeticCheck = (e) => {
    //https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string
    //regex taken from this site
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    format.test(panel[panel.length - 1])
      ? setPanel(panel.slice(0, -1) + e)
      : setPanel(panel + e);
  };

  return (
    <div className="container center-text">
      <div className="display-panel my-2">
        <DisplayPanel Panel={panel} />
      </div>
      <div className="operations my-2">
        <button
          className="btn btn-danger"
          onClick={(e) => {
            setPanel(e.target.value);
          }}
          value={"0"}
        >
          AC
        </button>
        <button
          className="btn btn-warning"
          onClick={(e) => {
            panel.length > 1 ? setPanel(panel.slice(0, -1)) : setPanel("0");
          }}
          value={""}
        >
          &#60;
        </button>
        <button
          className="btn btn-primary"
          value="+"
          onClick={(e) => {
            arithmeticCheck(e.target.value);
          }}
        >
          +
        </button>
        <button
          className="btn btn-primary"
          value="-"
          key="-"
          onClick={(e) => {
            arithmeticCheck(e.target.value);
          }}
        >
          -
        </button>
        <button
          className="btn btn-primary"
          value="*"
          key="*"
          onClick={(e) => {
            arithmeticCheck(e.target.value);
          }}
        >
          *
        </button>
        <button
          className="btn btn-primary"
          value="/"
          key="/"
          onClick={(e) => {
            arithmeticCheck(e.target.value);
          }}
        >
          /
        </button>
      </div>
      <div className="numbers my-2">
        <NumericKeys className="numbers" Buttons={numericButtons()} />
        <button
          className="btn btn-outline-dark mx-2"
          onClick={(e) =>
            // setPanel(panel + e.target.value)
            panel === initialValue
              ? setPanel(e.target.value)
              : setPanel(panel + e.target.value)
          }
          value="."
          key="."
        >
          .
        </button>
      </div>
      <div className="result">
        <button
          className="btn btn-success"
          //https://stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval
          onClick={(e) => {
            try {
              setPanel(
                eval(panel).length > 3 && eval(panel).includes(".")
                  ? String(eval(panel))
                  : String(eval(panel))
              );
            } catch (err) {
              setPanel("Error, please press AC");
            }
          }}
          value="="
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
