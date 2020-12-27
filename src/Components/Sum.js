import React from "react";
import "./Sum.css";

const Sum = props => {
  const first = props.sum.first;
  const second = props.sum.second;

  return (
    <div className="sum-container">
      <div className="sum">
        <div className="sum-element" type="number">
          {first}
        </div>
        <div className="sum-element">x</div>
        <div className="sum-element" type="number">
          {second}
        </div>
        <div className="sum-element">=</div>
      </div>
      <form onSubmit={props.checkResult} className="answer-container">
        <input disabled={false} className="result" type="text" />
      </form>
      <div className="right_or_wrong-circle"></div>
    </div>
  );
};

export default Sum;
