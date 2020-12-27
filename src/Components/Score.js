import React from "react";

const Score = props => {
  //   console.log(props.arrayOfSums);

  return (
    <div className="score">
      <h4>{props.label}</h4>
      <h3>{props.amount}</h3>
    </div>
  );
};

export default Score;
