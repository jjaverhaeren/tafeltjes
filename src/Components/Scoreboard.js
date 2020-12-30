import React from "react";
import Score from "./Score";
import Chart from "./Chart";
import "./ScoreBoard.css";

const ScoreBoard = (props) => {
  //   console.log(props.arrayOfSums);

  return (
    <div className="scoreBoard">
      <div className="correctwrongchart-container">
      <div className="chart-container">
          <Chart 
          HP={props.HP}
          shield={props.shield}
          />
        </div>
        <div className="correctwrong-container">
          <div className="correct-container">
            <Score amount={props.rightAnswers} label={"GOED:"} />
          </div>
          <div className="wrong-container">
            <Score amount={props.wrongAnswers} label={"FOUT:"} />
          </div>
          <div className="level-container">
            <h3>{props.level}</h3>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default ScoreBoard;
