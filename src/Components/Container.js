import React, { useState } from "react";
import ChooseTables from "./ChooseTables";
import ScoreBoard from "./Scoreboard";
import AllSumsContainer from "./AllSumsContainer";
import Victory from "./Victory";

const App = () => {
  const [round, setRound] = useState(0);
  const [chosenTables, setChosenTables] = useState([]);
  const [, setArrayOfSums] = useState([]);
  const [arrayOfChunks, setArrayOfChunks] = useState([]);
  const [totalOfSums, setTotalOfSums] = useState(0);
  const [answersGiven, setAnswersGiven] = useState(1);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [HP, setHP] = useState([100]);
  const [shield, setShield] = useState([0]);
  const [level, setLevel] = useState("Noob");
  const [victory, setVictory] = useState(false);

  const deleteFromArray = (item, array) => {
    const index = array.indexOf(item);
    array.splice(index, 1);
  };

  const chooseTable = event => {
    event.target.classList.toggle("chosen");
    const newChosenTables = [...chosenTables];
    const chosenTable = parseInt(event.target.innerHTML);
    newChosenTables.includes(chosenTable)
      ? deleteFromArray(chosenTable, newChosenTables)
      : newChosenTables.push(chosenTable);
    const newTotalOfSums = newChosenTables.length * 11;
    setTotalOfSums(newTotalOfSums);
    setChosenTables(newChosenTables);
    // console.log(
    //   `total of sums is: ${totalOfSums}, chosen tables array: ${chosenTables}`
    // );
  };

  const randomizeArray = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // console.log(array);
    return array;
  };

  const getRandomizedSums = array => {
    const randomizedSums = randomizeArray(array);
    randomizedSums.forEach(sum => {
      sum.id = randomizedSums.indexOf(sum);
    });
    return randomizedSums;
  };

  const getArrayOfChunks = array => {
    let newArrayOfChunks = [];
    while (array.length) {
      newArrayOfChunks.push(array.splice(0, 11));
    }
    const newRound = round + 1;
    setRound(newRound);
    setArrayOfChunks(newArrayOfChunks);
  };

  const renderSums = event => {
    let arrayOfTen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      newArrayOfSums = [];
    chosenTables.forEach(chosenTable => {
      arrayOfTen.forEach(number => {
        let sum = {};
        sum.first = number;
        sum.second = chosenTable;
        sum.result = number * chosenTable;
        newArrayOfSums.push(sum);
      });
    });
    getArrayOfChunks(getRandomizedSums(newArrayOfSums));
    event.target.innerHTML = "RESET";
    event.target.classList.remove("letsGo");
    event.target.classList.add("letsReset");
    // console.log(this.state);
  };

  const resetSums = event => {
    const container = event.target.parentNode.childNodes[1];
    // console.log(container.childNodes[0]);
    for (let i = 0; i < 10; i++) {
      container.childNodes[i].classList.remove("chosen");
    }
    // console.log(event.target.parentNode.childNodes[1]);
    event.target.innerHTML = "Let's Go!";
    event.target.classList.remove("letsReset");
    event.target.classList.add("letsGo");
    setChosenTables([]);
    setArrayOfSums([]);
    setArrayOfChunks([]);
    setTotalOfSums(0);
    setAnswersGiven(1);
    setRightAnswers(0);
    setWrongAnswers(0);
    setHP([100]);
    setShield([0]);
    setLevel("Noob");
    setVictory(false);
  };

  const handleClick = event => {
    event.target.innerHTML === "Let's Go!"
      ? renderSums(event)
      : resetSums(event);
    // console.log(event.target.classList);
  };

  const allDone = () => {
    answersGiven !== totalOfSums
      ? console.log(
          `#answers given: ${answersGiven} vs # total of sums: ${totalOfSums}`
        )
      : rightAnswers / totalOfSums > 0.9
      ? setVictory(true)
      : console.log("RESET");
  };

  const focusToNextInput = event => {
    const parent = event.target.parentNode.parentNode;
    let array = [];
    array.push(parent.childNodes);
    let array2 = [];
    for (let i = 0; i < 11; i++) {
      array2.push(array[0][i]);
    }
    let index = array2.indexOf(event.target.parentNode);
    let nextIndex = index + 1;
    nextIndex === 11
      ? checkResult(event)
      : array2[nextIndex].childNodes[1].childNodes[0].focus();
  };

  const giveAnswer = event => {
    event.preventDefault();
    const newAnswersGiven = answersGiven + 1;
    setAnswersGiven(newAnswersGiven);
    focusToNextInput(event);
    checkResult(event);
  };

  const checkResult = event => {
    event.target.childNodes[0].disabled = true;

    const first = parseInt(
      event.target.parentNode.childNodes[0].childNodes[0].innerHTML
    );
    const second = parseInt(
      event.target.parentNode.childNodes[0].childNodes[2].innerHTML
    );
    const result = first * second;
    const answer = parseInt(event.target.childNodes[0].value);

    // console.log(this.state);
    result === answer ? handleCorrectAnswer(event) : handleWrongAnswer(event);
  };

  const handleCorrectAnswer = event => {
    // console.log(this.state.sumsWithAnswerArray);
    const circle = event.target.parentNode.childNodes[2];
    circle.classList.remove("right_or_wrong-circle_red");
    circle.classList.add("right_or_wrong-circle_green");
    const newRightAnswers = rightAnswers + 1;
    setRightAnswers(newRightAnswers);
    calculateHpAndShield();
    calculateLevel();
    allDone();
  };

  const handleWrongAnswer = event => {
    // console.log("WRONG ANSWER");
    const circle = event.target.parentNode.childNodes[2];
    circle.classList.remove("right_or_wrong-circle_green");
    circle.classList.add("right_or_wrong-circle_red");
    const newWrongAnswers = wrongAnswers + 1;
    setWrongAnswers(newWrongAnswers);
    calculateHpAndShield();
    calculateLevel();
    allDone();
  };

  const calculateLevel = () => {
    let newLevel;
    if (shield > 80) {
      newLevel = "Hacker";
    } else if (shield > 45) {
      newLevel = "Pro";
    } else if (shield > 17) {
      newLevel = "Medium";
    } else if (shield >= 0) {
      newLevel = "Noob";
    } else {
      newLevel = "no level set";
    }
    // console.log(newLevel);
    setLevel(newLevel);
  };

  const calculateHpAndShield = () => {
    const total = totalOfSums;
    let newShield = [0];
    let newHP = [100];
    const right = rightAnswers;
    total === 0
      ? (newShield = [0])
      : (newShield = [Math.round((right / total) * 100)]);
    // console.log(newShield)

    const wrong = wrongAnswers;
    total === 0
      ? (newHP = [100])
      : (newHP = [Math.round(100 - (wrong / total) * 100)]);
    // console.log(newHP)

    setHP(newHP);
    setShield(newShield);
  };

  return (
    <div className="app-container">
      <div className="header">
        <ChooseTables chooseTable={chooseTable} handleClick={handleClick} />
      </div>
      <Victory victory={victory} />
      <div className="play-container">
        <ScoreBoard
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          HP={HP}
          shield={shield}
          level={level}
        />
        <AllSumsContainer
          giveAnswer={giveAnswer}
          arrayOfChunks={arrayOfChunks}
          chosenTables={chosenTables}
        />
      </div>
    </div>
  );
};

export default App;
