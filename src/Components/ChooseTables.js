import React from "react";
import "./ChooseTables.css";

const ChooseTables = props => {
  // console.log(props)

  return (
    <div className="chooseTables">
      <p>Ik wil graag de tafeltjes van</p>
      <div className="buttons-container">
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          1
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          2
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          3
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          4
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          5
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          6
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          7
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          8
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          9
        </button>
        <button className="chooseTables_buttons" onClick={props.chooseTable}>
          10
        </button>
      </div>

      <p>oefenen.</p>
      <button className="letsGo" onClick={props.handleClick}>
        Let's Go!
      </button>
    </div>
  );
};

export default ChooseTables;
