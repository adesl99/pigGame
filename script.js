"use strict";
const playersScores = document.querySelectorAll(".score");
const rollBtn = document.querySelector(".btn--roll");
const imageDice = document.querySelector(".dice");
const players = document.querySelectorAll(".player");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

//variabels
let number = 0;
let player0 = true;
let player1 = false;
let currScore0 = 0;
let currScore1 = 0;
//Intilizing the scores
playersScores.forEach((elm) => (elm.textContent = "0"));

//Main functions

const rollTheDice = function () {
  const randomNumber = Math.trunc(Math.random() * 6 + 1);
  number += randomNumber;
  if (randomNumber === 1) turnRounds();
  imageDice.src = `dice-${randomNumber}.png`;
  checkParentClass(score0, "player--active");
  players.forEach((elm) => {
    showScore();
  });
};

const holdTheScore = function () {
  if (player0) {
    currScore0 += number;
    currentScore0.textContent = currScore0;
    newScore();
  } else {
    currScore1 += number;
    currentScore1.textContent = currScore1;
    newScore();
  }
};
const startNewGame = function () {
  players.forEach((player) => {
    player.classList.remove("player--winner");
    player.classList.toggle("player--active");
    number = 0;
    showScore();
    currScore0 = 0;
    currScore1 = 0;
    currentScore0.textContent = currScore0;
    currentScore1.textContent = currScore1;
    rollBtn.disabled = false;
    holdBtn.disabled = false;
  });
};

//helpFunctions
const newScore = function () {
  number = 0;
  showScore();
  checkWinner();
  turnRounds();
};
const turnRounds = function () {
  players.forEach((player) => {
    number = 0;
    showScore();
    player.classList.toggle("player--active");
  });
};

function checkParentClass(node, className) {
  // Check if the parent element has the specified class
  if (node.parentNode.classList.contains(className)) {
    // Perform the task you want to do
    player0 = true;
    player1 = false;
  } else {
    player1 = true;
    player0 = false;
  }
}
//its only for not drying the Code and to show the results
const showScore = function () {
  if (player0) {
    score0.textContent = number;
  } else {
    score1.textContent = number;
  }
};

const checkWinner = function () {
  if (currScore0 >= 100) winTheGame();

  if (currScore1 >= 100) winTheGame();
};

const winTheGame = function () {
  rollBtn.disabled = true;
  holdBtn.disabled = true;
  players.forEach((player) => {
    if (player.classList.contains("player--active"))
      player.classList.add("player--winner");
  });
};

//Events
rollBtn.addEventListener("click", rollTheDice);
holdBtn.addEventListener("click", holdTheScore);
newBtn.addEventListener("click", startNewGame);
