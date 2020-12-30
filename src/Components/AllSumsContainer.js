import React from "react";
import TenContainer from "./TenContainer";

const AllSumsContainer = props => {
  // console.log(arrayOfChunks);

  return (
    <div>
      {props.arrayOfChunks.map(chunk => (
        <TenContainer
          key={props.arrayOfChunks.indexOf(chunk)}
          giveAnswer ={props.giveAnswer}
          arrayOfSums={chunk}
          chosenTables={props.chosenTables}
        />
      ))}
    </div>
  );
};

export default AllSumsContainer;
