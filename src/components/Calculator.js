//This is the base of everything
import React, { useState } from "react";
import DisplayPanel from "./DisplayPanel";
import NumericKeys from "./NumericKeys";
import "./Calculator.css";

function Calculator() {
  const [panel, setPanel] = useState([]);

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
        <button
          className="btn btn-danger"
          onClick={(e) => setPanel(e.target.value)}
          value={""}
          key={0}
        >
          AC
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            //https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string
            //regex taken from this site
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            format.test(panel[panel.length - 1])
              ? setPanel(panel.slice(0, -1) + e.target.value)
              : setPanel(panel + e.target.value);
          }}
          value="+"
        >
          +
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            format.test(panel[panel.length - 1])
              ? setPanel(panel.slice(0, -1) + e.target.value)
              : setPanel(panel + e.target.value);
          }}
          value="-"
        >
          -
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            format.test(panel[panel.length - 1])
              ? setPanel(panel.slice(0, -1) + e.target.value)
              : setPanel(panel + e.target.value);
          }}
          value="*"
        >
          *
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            format.test(panel[panel.length - 1])
              ? setPanel(panel.slice(0, -1) + e.target.value)
              : setPanel(panel + e.target.value);
          }}
          value="/"
        >
          /
        </button>
      </div>
      <div className="numbers my-2">
        <NumericKeys className="numbers" Buttons={numericButtons()} />
        <button
          className="btn btn-outline-dark mx-2"
          onClick={(e) => setPanel(panel + e.target.value)}
          value="."
          key="."
        >
          .
        </button>
      </div>
      <div className="result">
        <button
          className="btn btn-success"
          onClick={(e) => {
            try {
              setPanel(
                String(eval(panel)).lenght > 3 &&
                  String(eval(panel)).includes(".")
                  ? String(eval(panel))
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
    </div>
  );
}

export default Calculator;
