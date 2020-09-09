//This is the base of everything
import React, { useState, useEffect } from "react";
import * as math from "mathjs";
import "./Calculator.css";

function Calculator({ initialValue }) {
  const [panel, setPanel] = useState(initialValue);
  const [subPanel, setSubPanel] = useState("0");
  //https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string
  //regex taken from this site
  let arithRegex = /[*+-/()]+/;
  let parenthRegex = /[()]+/;

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
  const createFunction = (name, value) => {
    return { name, value };
  };

  const functions = [
    createFunction("AC", "AC"),
    createFunction("<", "<"),
    createFunction("Edit", "Edit"),
    createFunction("+", "+"),
    createFunction("-", "-"),
    createFunction("*", "*"),
    createFunction("/", "/"),
    createFunction("(", "("),
    createFunction(")", ")"),
  ];

  const arithmeticCheck = (e) => {
    arithRegex.test(panel[panel.length - 1])
      ? setPanel(panel.slice(0, -1) + e)
      : setPanel(panel + e);
    if (parenthRegex.test(panel[panel.length - 1])) {
      setPanel(panel + e);
    }
  };
  const parenthesis = (e) => {
    panel === "" || panel === "0" ? setPanel(e) : setPanel(panel + e);
  };

  return (
    <div className="container center-text">
      <div className="my-2">{subPanel}</div>
      <div className="display-panel my-2">{panel}</div>
      <div>
        {functions.map((data, key) => (
          <button
            key={key}
            value={data.value}
            onClick={(e) => {
              switch (data.value) {
                case "AC":
                  if (initialValue === "0" || initialValue === "") {
                    setPanel("0");
                    setSubPanel("0");
                  } else {
                    setPanel(initialValue);
                    setSubPanel("0");
                  }
                  break;
                case "<":
                  if (panel.length > 1) {
                    setPanel(panel.slice(0, -1));
                  } else if (panel.length <= 1 && initialValue === "") {
                    setPanel("0");
                  } else if (panel.length <= 1 && initialValue !== "") {
                    setPanel(initialValue);
                  }
                  break;
                case "Edit":
                  subPanel === "0"
                    ? setPanel(panel)
                    : setPanel(subPanel.slice(0, -2));
                  break;
                case "+":
                  arithmeticCheck(e.target.value);
                  break;
                case "-":
                  arithmeticCheck(e.target.value);
                  break;
                case "*":
                  arithmeticCheck(e.target.value);
                  break;
                case "/":
                  arithmeticCheck(e.target.value);
                  break;
                case "(":
                  parenthesis(e.target.value);
                  break;
                case ")":
                  parenthesis(e.target.value);
                  break;
              }
            }}
          >
            {data.name}
          </button>
        ))}
      </div>
      <div className="numbers my-2">
        <div>{numericButtons()}</div>
        <button
          className="btn btn-outline-dark mt-2"
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
              setPanel("Error, please press AC to delete or Prev to edit");
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
