import React from "react";
import Score from "./Score";
import "./ScoreBoard.css";

const ScoreBoard = props => {
  //   console.log(props.arrayOfSums);

  return (
    <div className="scoreBoard">
      <div className="correct-container">
        <h3>Goed</h3>
        <Score amount={props.rightAnswers} />
      </div>
      <div className="wrong-container">
        <h3>Fout</h3>
        <Score amount={props.wrongAnswers} />
      </div>
      <div className="level-container">
        <h4>Level</h4>
        <h3>{props.level}</h3>
      </div>
    </div>
  );
};

export default ScoreBoard;
