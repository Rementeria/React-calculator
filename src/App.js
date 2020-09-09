import React from "react";
import Calculator from "./components/Calculator";
import "./App.css";

function App() {
  return (
    <div className="container text-center">
      <>
        <h1 className="h2 mt-5 tittle">Calculator</h1>
        <p className="">Created to qualify for "Entry" position at 23People</p>
      </>
      <>
        <Calculator initialValue={""} />
      </>
    </div>
  );
}

export default App;
