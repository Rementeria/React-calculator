//This is the base of everything
import React, { useState, useEffect } from "react";
import * as math from "mathjs";
import "./Calculator.css";

function Calculator({ initialValue }) {
  const [panel, setPanel] = useState(initialValue);
  const [subPanel, setSubPanel] = useState("Ans");
  //https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string
  //regex taken from this site
  let arithRegex = /[*+-/()]+/;
  let parenthRegex = /[()]+/;

  useEffect(() => {
    if (initialValue === "") {
      setPanel("0");
    }
  }, [initialValue]);

  const createFunction = (name, value, style) => {
    return { name, value, style };
  };

  const functions = [
    createFunction("AC", "AC", "nes-btn is-error col-3"),
    createFunction("<<", "Delete", "nes-btn is-warning col-3"),
    createFunction("Ans", "Edit", "nes-btn is-warning col-3"),

    createFunction("+", "+", "nes-btn is-primary col-3"),
    createFunction("-", "-", "nes-btn is-primary col-3"),
    createFunction("*", "*", "nes-btn is-primary col-3"),

    createFunction("/", "/", "nes-btn is-primary col-3"),
    createFunction("(", "(", "nes-btn is-primary col-3"),
    createFunction(")", ")", "nes-btn  is-primary col-3"),

    createFunction("7", "7", "nes-btn col-3"),
    createFunction("8", "8", "nes-btn col-3"),
    createFunction("9", "9", "nes-btn col-3"),

    createFunction("4", "4", "nes-btn col-3"),
    createFunction("5", "5", "nes-btn col-3"),
    createFunction("6", "6", "nes-btn col-3"),

    createFunction("1", "1", "nes-btn col-3"),
    createFunction("2", "2", "nes-btn col-3"),
    createFunction("3", "3", "nes-btn col-3"),

    createFunction("0", "0", "nes-btn col-3"),
    createFunction(".", ".", "nes-btn col-3"),
    createFunction("=", "Result", "nes-btn is-success col-3"),
  ];

  const buttonAC = () => {
    if (initialValue === "0" || initialValue === "") {
      setPanel("0");
      setSubPanel("Ans");
    } else {
      setPanel(initialValue);
      setSubPanel("Ans");
    }
  };
  const buttonDelete = () => {
    if (panel.length > 1 && panel !== "Error") {
      setPanel(panel.slice(0, -1));
    } else if (panel.length <= 1 && initialValue === "") {
      setPanel("0");
    } else if (panel.length <= 1 && initialValue !== "") {
      setPanel(initialValue);
    }
  };
  const buttonEdit = () => {
    subPanel === "Ans" ? setPanel(panel) : setPanel(subPanel.slice(0, -1));
  };
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
  const buttonNumber = (e) => {
    panel === "" || panel === "0" ? setPanel(e) : setPanel(panel + e);
  };
  const buttonResult = () => {
    try {
      setSubPanel(panel + "=");
      setPanel(math.evaluate(panel));
    } catch (err) {
      setPanel("Error, press AC");
      if (panel === "Error, press AC") {
        setSubPanel(subPanel);
      }
    }
  };

  return (
    <div className="calculator-size">
      <div className="nes-container pc">
        <div className="nes-input is-dark display">
          <div className="mb-2 d-flex flex-row-reverse sub-panel">
            {subPanel}
          </div>
          <div className="d-flex flex-row-reverse panel">{panel}</div>
        </div>

        <div className="container">
          {functions.map((data, key) => (
            <button
              key={key}
              value={data.value}
              className={data.style}
              onClick={(e) => {
                switch (data.value) {
                  case "AC":
                    buttonAC();
                    break;
                  case "Delete":
                    buttonDelete();
                    break;
                  case "Edit":
                    buttonEdit();
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
                  case "1":
                    buttonNumber(e.target.value);
                    break;
                  case "2":
                    buttonNumber(e.target.value);
                    break;
                  case "3":
                    buttonNumber(e.target.value);
                    break;
                  case "4":
                    buttonNumber(e.target.value);
                    break;
                  case "5":
                    buttonNumber(e.target.value);
                    break;
                  case "6":
                    buttonNumber(e.target.value);
                    break;
                  case "7":
                    buttonNumber(e.target.value);
                    break;
                  case "8":
                    buttonNumber(e.target.value);
                    break;
                  case "9":
                    buttonNumber(e.target.value);
                    break;
                  case "0":
                    buttonNumber(e.target.value);
                    break;
                  case ".":
                    buttonNumber(e.target.value);
                    break;
                  case "Result":
                    buttonResult();
                    break;
                  default:
                    setPanel("Error");
                }
              }}
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>
      <div className="d-flex flex-row-reverse">
        <p>
          Style by:{" "}
          <a
            href="https://nostalgic-css.github.io/NES.css/?fbclid=IwAR0q7FJyFhkv8P9wOkr35zPE8MiQsPnZjqOqoGUn3s9THD2j2v0v2ajSaf4"
            target="_blank"
            rel="noopener noreferrer"
          >
            NES.css
          </a>
        </p>
      </div>
    </div>
  );
}

export default Calculator;
