//This is the base of everything
import React, { useState, useEffect } from "react";
import DisplayPanel from "./DisplayPanel";
import NumericKeys from "./NumericKeys";
import * as math from "mathjs";
import "./Calculator.css";

function Calculator({ initialValue }) {
  const [panel, setPanel] = useState(initialValue);
  const [subPanel, setSubPanel] = useState("0");
  //https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string
  //regex taken from this site
  let format = /[*+-/()]+/;
  let format2 = /[()]+/;

  useEffect(() => {
    if (initialValue === "") {
      setPanel("0");
    }
  }, [initialValue]);
  const numericButtons = () => {
    const numbers = [];
    for (let i = 9; i >= 0; i--) {
      numbers.push(
        <button
          className="btn btn-outline-dark mx-2"
          onClick={(e) =>
            panel === "" || panel === "0"
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
    format.test(panel[panel.length - 1])
      ? setPanel(panel.slice(0, -1) + e)
      : setPanel(panel + e);
    if (format2.test(panel[panel.length - 1])) {
      setPanel(panel + e);
    }
  };
  const parenthesis = (e) => {
    panel === "" || panel === "0" ? setPanel(e) : setPanel(panel + e);
  };

  return (
    <div className="container center-text">
      <div>{subPanel}</div>
      <div className="display-panel my-2">
        <DisplayPanel Panel={panel} />
      </div>
      <div className="operations my-2">
        <button
          className="btn btn-danger"
          value={initialValue}
          onClick={(e) => {
            initialValue === "0" || initialValue === ""
              ? setPanel("0")
              : setPanel(e.target.value);
            setSubPanel("0");
          }}
        >
          AC
        </button>
        <button
          className="btn btn-warning"
          onClick={() => {
            if (panel.length > 1) {
              setPanel(panel.slice(0, -1));
            } else if (panel.length <= 1 && initialValue === "") {
              setPanel("0");
            } else if (panel.length <= 1 && initialValue !== "") {
              setPanel(initialValue);
            }
          }}
        >
          &#60;
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            subPanel === "0"
              ? setPanel(panel)
              : setPanel(subPanel.slice(0, -2));
          }}
        >
          Prev
        </button>
        <button
          className="btn btn-secondary"
          value="("
          onClick={(e) => {
            parenthesis(e.target.value);
          }}
        >
          (
        </button>
        <button
          className="btn btn-secondary"
          value=")"
          onClick={(e) => {
            parenthesis(e.target.value);
          }}
        >
          )
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
          onClick={() => {
            try {
              setSubPanel(panel + " =");
              setPanel(math.evaluate(panel));
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
