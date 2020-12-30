import React, { Component } from "react";
import ChooseTables from "./ChooseTables";
import AllSumsContainer from "./AllSumsContainer";
import ScoreBoard from "./Scoreboard";
import Victory from "./Victory";

class Container extends Component {
  constructor() {
    super();
    this.state = {
      round: 0,
      chosenTables: [],
      arrayOfSums: [],
      arrayOfChunks: [],
      totalOfSums: 0,
      answersGiven: 1,
      rightAnswers: 0,
      wrongAnswers: 0,
      HP: [100],
      shield: [0],
      level: "Noob",
      sumsWithAnswerArray: [],
      victory: false,
    };
    this.chooseTable = this.chooseTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.giveAnswer = this.giveAnswer.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.renderSums = this.renderSums.bind(this);
    this.resetSums = this.resetSums.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  deleteFromArray(item, array) {
    const index = array.indexOf(item);
    array.splice(index, 1);
  }

  chooseTable(event) {
    event.target.classList.toggle("chosen");
    this.setState(prevState => {
      const newChosenTables = [...prevState.chosenTables];
      const chosenTable = parseInt(event.target.innerHTML);
      newChosenTables.includes(chosenTable)
        ? this.deleteFromArray(chosenTable, newChosenTables)
        : newChosenTables.push(chosenTable);
      const newTotalOfSums = newChosenTables.length * 11;
      const newState = {
        ...prevState,
        chosenTables: newChosenTables,
        totalOfSums: newTotalOfSums,
      };
      // console.log(newChosenTables);
      return newState;
    });
  }

  randomizeArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    //   console.log(array)
    return array;
  }

  getRandomizedSums(array) {
    const randomizedSums = this.randomizeArray(array);
    randomizedSums.forEach(sum => {
      sum.id = randomizedSums.indexOf(sum);
    });
    return randomizedSums;
  }

  getArrayOfChunks(array) {
    let newArrayOfChunks = [];
    while (array.length) {
      newArrayOfChunks.push(array.splice(0, 11));
    }

    // console.log(randomizedSums);
    this.setState(prevState => {
      const newRound = this.state.round + 1;
      const newState = {
        ...prevState,
        round: newRound,
        arrayOfChunks: newArrayOfChunks,
      };
      return newState;
    });
  }

  handleClick(event) {
    console.log(event.target.innerHTML);
    event.target.innerHTML === "Let's Go!"
      ? this.renderSums(event)
      : this.resetSums(event);
    // console.log(event.target.classList);
  }

  resetSums(event) {
    const container = event.target.parentNode.childNodes[1];
    console.log(container.childNodes[0]);
    for (let i = 0; i < 10; i++) {
      container.childNodes[i].classList.remove("chosen");
    }
    console.log(event.target.parentNode.childNodes[1]);
    event.target.innerHTML = "Let's Go!";
    event.target.classList.remove("letsReset");
    event.target.classList.add("letsGo");
    this.setState(prevState => {
      const newState = {
        ...prevState,
        chosenTables: [],
        arrayOfSums: [],
        arrayOfChunks: [],
        totalOfSums: 0,
        answersGiven: 1,
        rightAnswers: 0,
        wrongAnswers: 0,
        HP: [100],
        shield: [0],
        level: "Noob",
        sumsWithAnswerArray: [],
        victory: false,
      };
      return newState;
    });
  }
  renderSums(event) {
    let arrayOfTen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      newArrayOfSums = [];
    this.state.chosenTables.forEach(chosenTable => {
      arrayOfTen.forEach(number => {
        let sum = {};
        sum.first = number;
        sum.second = chosenTable;
        sum.result = number * chosenTable;
        newArrayOfSums.push(sum);
      });
    });
    this.getArrayOfChunks(this.getRandomizedSums(newArrayOfSums));
    event.target.innerHTML = "RESET";
    event.target.classList.remove("letsGo");
    event.target.classList.add("letsReset");
    // console.log(this.state);
  }

  getSumsWithWrongAnswers() {
    const newArrayOfSums = [];
    this.state.sumsWithAnswerArray.forEach(sum => {
      sum.result !== sum.answer
        ? newArrayOfSums.push(sum)
        : console.log("sum has correct answer");
    });
    this.setState(prevState => {
      const newState = { ...prevState, arrayOfSums: newArrayOfSums };
      return newState;
    });
  }

  // practiseMore() {
  //   const arrayOfSums = this.state.sumsWithAnswerArray;
  //   console.log(arrayOfSums);
  //   // this.getArrayOfChunks(this.getRandomizedSums(arrayOfSums));
  // }

  allDone() {
    console.log(
      `victoryfactor: ${this.state.rightAnswers / this.state.totalOfSums}`
    );
    this.state.answersGiven !== this.state.totalOfSums
      ? console.log(
          `#answers given: ${this.state.answersGiven} vs # total of sums: ${this.state.totalOfSums}`
        )
      : this.state.rightAnswers / this.state.totalOfSums > 0.9
      ? this.setState({ victory: true })
      : console.log("show score");
  }

  getTotalOfSums(array) {
    let newTotalOfSums = 0;
    array.forEach(element => {
      newTotalOfSums += element.length;
    });
    return newTotalOfSums;
  }
  giveAnswer(event) {
    event.preventDefault();
    // console.log("werkt");
    this.setState(prevState => {
      const newAnswersGiven = this.state.answersGiven + 1;
      const newState = { ...prevState, answersGiven: newAnswersGiven };
      return newState;
    });
    this.checkResult(event);
  }

  checkResult(event) {
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
    result === answer
      ? this.handleCorrectAnswer(event)
      : this.handleWrongAnswer(event);
  }

  setLevel() {
    let shield = this.state.shield[0];
    // console.log(shield);
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
    this.setState(prevState => {
      const newState = { ...prevState, level: newLevel };
      return newState;
    });
  }

  calculateHpAndShield() {
    const total = this.state.totalOfSums;
    let newShield = [0];
    let newHP = [100];
    console.log(total);
    const right = this.state.rightAnswers;
    total === 0
      ? (newShield = [0])
      : (newShield = [Math.round((right / total) * 100)]);
    // console.log(newShield)

    const wrong = this.state.wrongAnswers;
    total === 0
      ? (newHP = [100])
      : (newHP = [Math.round(100 - (wrong / total) * 100)]);
    // console.log(newHP)

    this.setState(prevState => {
      const newState = { ...prevState, HP: newHP, shield: newShield };
      return newState;
    });
  }

  handleCorrectAnswer(event) {
    // console.log(this.state.sumsWithAnswerArray);
    const circle = event.target.parentNode.childNodes[2];
    circle.classList.remove("right_or_wrong-circle_red");
    circle.classList.add("right_or_wrong-circle_green");
    this.setState(prevState => {
      const newRightAnswers = this.state.rightAnswers + 1;
      const newState = {
        ...prevState,
        rightAnswers: newRightAnswers,
      };
      console.log(`amount of right answers: ${newRightAnswers}`);
      return newState;
    });
    this.calculateHpAndShield();
    this.setLevel();
    this.allDone();
  }

  handleWrongAnswer(event) {
    // console.log("WRONG ANSWER");
    const first = parseInt(
      event.target.parentNode.childNodes[0].childNodes[0].innerHTML
    );
    const second = parseInt(
      event.target.parentNode.childNodes[0].childNodes[2].innerHTML
    );
    const result = first * second;
    const answer = parseInt(event.target.childNodes[0].value);
    const circle = event.target.parentNode.childNodes[2];
    circle.classList.remove("right_or_wrong-circle_green");
    circle.classList.add("right_or_wrong-circle_red");
    this.setState(prevState => {
      const sumWithAnswer = {};
      sumWithAnswer.first = first;
      sumWithAnswer.second = second;
      sumWithAnswer.result = result;
      sumWithAnswer.answer = answer;
      // console.log(sumWithAnswer);
      const newSumsWithAnswerArray = [...prevState.sumsWithAnswerArray];
      newSumsWithAnswerArray.push(sumWithAnswer);

      const newWrongAnswers = this.state.wrongAnswers + 1;
      const newState = {
        ...prevState,
        wrongAnswers: newWrongAnswers,
        sumsWithAnswerArray: newSumsWithAnswerArray,
      };
      // console.log(newState.sumsWithAnswerArray);
      return newState;
    });
    this.calculateHpAndShield();
    this.setLevel();
    this.allDone();
  }

  render() {
    return (
      <div className="app-container">
        <div className="header">
          <ChooseTables
            chooseTable={this.chooseTable}
            handleClick={this.handleClick}
          />
        </div>
        <Victory victory={this.state.victory} />
        <div className="play-container">
          <ScoreBoard
            rightAnswers={this.state.rightAnswers}
            wrongAnswers={this.state.wrongAnswers}
            HP={this.state.HP}
            shield={this.state.shield}
            level={this.state.level}
          />
          <AllSumsContainer
            giveAnswer={this.giveAnswer}
            arrayOfChunks={this.state.arrayOfChunks}
            chosenTables={this.state.chosenTables}
          />
        </div>
      </div>
    );
  }
}

export default Container;
