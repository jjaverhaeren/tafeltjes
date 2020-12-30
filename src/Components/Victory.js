import React from "react";
import "./Victory.css";

const Victory = ({ victory }) => {
  // console.log(victory);
  let className=""
  let classNr = Math.round(Math.random() * 2);

  switch (classNr) {
    case 0:
      className = "victory-container1";
      break;
    case 1:
      className = "victory-container2";
      break;
    case 2:
      className = "victory-container3";
      break;
    default:
      className = "victory-container3";
  }

  return (
    <div>
      {victory === true ? (
        <div id="victory" className={className}>
          <h1>Victory Royale!</h1>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Victory;
