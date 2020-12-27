import React from "react";
import Sum from "./Sum";

const TenContainer = props => {
  //   console.log(props.arrayOfSums);

  return (
    <div className="tencontainer">
      {props.arrayOfSums.map(sum => (
        <Sum
          key={sum.id}
          sum={sum}
          checkResult={props.checkResult}
          showYellow={props.showYellow}
          showOrange={props.showOrange}
          showRed={props.showRed}
        />
      ))}
    </div>
  );
};

export default TenContainer;
