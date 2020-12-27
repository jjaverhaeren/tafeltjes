import React, { Component } from "react";
import ChooseTables from "./ChooseTables";
import AllSumsContainer from "./AllSumsContainer";
import ScoreBoard from "./Scoreboard";

class Container extends Component {
  constructor() {
    super();
    this.state = {
      chosenTables: [],
      arrayOfSums: [],
      arrayOfChunks: [],
      totalOfSums: 0,
      answers: 1,
      rightAnswers: 0,
      wrongAnswers: 0,
      level: "Noob",
      sumsWithAnswerArray: [],
    };
    this.chooseTable = this.chooseTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.renderSums = this.renderSums.bind(this);
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
      const newState = { ...prevState, chosenTables: newChosenTables };
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
      const newState = { ...prevState, arrayOfChunks: newArrayOfChunks };
      return newState;
    });
  }

  renderSums() {
    let arrayOfTen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      arrayOfSums = [];
    this.state.chosenTables.forEach(chosenTable => {
      arrayOfTen.forEach(number => {
        let sum = {};
        sum.first = number;
        sum.second = chosenTable;
        sum.result = number * chosenTable;
        arrayOfSums.push(sum);
      });
    });

    this.getArrayOfChunks(this.getRandomizedSums(arrayOfSums));
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

  practiseMore() {
    const arrayOfSums = this.state.sumsWithAnswerArray;
    console.log(arrayOfSums);
    // this.getArrayOfChunks(this.getRandomizedSums(arrayOfSums));
  }

  allDone() {
    this.state.answers === this.state.totalOfSums
      ? alert("KLAAR!")
      : console.log(
          `#answers given: ${this.state.answers} vs # total of sums: ${this.state.totalOfSums}`
        );
  }

  getTotalOfSums(array) {
    let newTotalOfSums = 0;
    array.forEach(element => {
      newTotalOfSums += element.length;
    });
    return newTotalOfSums;
  }

  checkResult(event) {
    event.preventDefault();
    event.target.childNodes[0].disabled = true;

    const first = parseInt(
      event.target.parentNode.childNodes[0].childNodes[0].innerHTML
    );
    const second = parseInt(
      event.target.parentNode.childNodes[0].childNodes[2].innerHTML
    );
    const result = first * second;
    const answer = parseInt(event.target.childNodes[0].value);

    // console.log(first);
    // console.log(second);

    const newTotalOfSums = this.getTotalOfSums(this.state.arrayOfChunks);
    console.log(newTotalOfSums);
    this.setState({ totalOfSums: newTotalOfSums });

    console.log(this.state);

    result === answer
      ? this.handleCorrectAnswer(event)
      : this.handleWrongAnswer(event);
  }

  handleCorrectAnswer(event) {
    // console.log(this.state.sumsWithAnswerArray);
    const circle = event.target.parentNode.childNodes[2];
    circle.classList.remove("right_or_wrong-circle_red");
    circle.classList.add("right_or_wrong-circle_green");
    this.setState(prevState => {
      const newAnswers = this.state.answers + 1;
      const newRightAnswers = this.state.rightAnswers + 1;
      const newState = {
        ...prevState,
        answers: newAnswers,
        rightAnswers: newRightAnswers,
      };
      // console.log(`amount of right answers: ${newRightAnswers}`);
      return newState;
    });
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
      const newAnswers = this.state.answers + 1;
      const newState = {
        ...prevState,
        answers: newAnswers,
        wrongAnswers: newWrongAnswers,
        sumsWithAnswerArray: newSumsWithAnswerArray,
      };
      console.log(newState.sumsWithAnswerArray);
      return newState;
    });
    this.allDone();
  }

  render() {
    return (
      <div>
        <ChooseTables
          chooseTable={this.chooseTable}
          renderSums={this.renderSums}
        />
        <ScoreBoard
          rightAnswers={this.state.rightAnswers}
          wrongAnswers={this.state.wrongAnswers}
          level={this.state.level}
        />

        <AllSumsContainer
          checkResult={this.checkResult}
          arrayOfChunks={this.state.arrayOfChunks}
          chosenTables={this.state.chosenTables}
        />
      </div>
    );
  }
}

export default Container;
