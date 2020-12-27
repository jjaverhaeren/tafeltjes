import React from "react";
import Score from "./Score";
import "./ScoreBoard.css";

const ScoreBoard = props => {
  //   console.log(props.arrayOfSums);

  return (
    <div className="scoreBoard">
      <div className="correct-container">
        <Score amount={props.rightAnswers} label={"GOED:"} />
      </div>
      <div className="wrong-container">
        <Score amount={props.wrongAnswers} label={"FOUT:"} />
      </div>
      <div className="level-container">
        <h4>Level:</h4>
        <h3>{props.level}</h3>
      </div>
    </div>
  );
};

export default ScoreBoard;
