import {
  CROSS_CLASS,
  NAUGHT_CLASS,
  CROSS_TITLE,
  NAUGHT_TITLE,
  DRAW_TITLE,
  WINNER_TITLE,
  WINNING_COMBINATIONS,
} from "../consts/index.js";

const cellElements = document.querySelectorAll("[data-cell]");
const gameboard = document.querySelector(".gameboard:not(.presentation)");
const title = document.getElementsByClassName("turn-title")[0];
let currentMark = CROSS_CLASS;
const cells = ["", "", "", "", "", "", "", "", ""];

export const initGame = () => {
  cellElements.forEach((cellElement, index) => {
    cellElement.addEventListener('click', (e) => handleClick(e, index), { once: true });
  });
};

function handleClick(e, index) {
  const cell = e.target;
    const mark = currentMark;
    changeValue(index, mark);
    changeTitle(mark);
    changeClass(cell, mark);
    if (checkWin(mark)) {
      return endGame(mark);
    } else if (isDraw()) {
      return endGame(mark);
    }
    changeMark(getOppositeMark(mark));
}

function changeValue(index, value) {
  cells[index] = value;
}

function changeMark(newMark) {
  return currentMark = newMark; 
}

function changeTitle(mark) {
  if (checkWin(mark)) {
    return title.textContent = WINNER_TITLE(mark);
  } else if (isDraw()) {
    return title.textContent = DRAW_TITLE;
  }
  return title.textContent = getOppositeMark(mark) === CROSS_CLASS ? CROSS_TITLE : NAUGHT_TITLE;
}

function getOppositeMark(mark) {
  return mark === CROSS_CLASS ? NAUGHT_CLASS : CROSS_CLASS; 
}

function changeClass(cell, mark) {
  cell.classList.add(mark);
  gameboard.classList.remove(mark);
  gameboard.classList.add(getOppositeMark(mark));
}

function checkWin(mark) {
  return WINNING_COMBINATIONS.some(
    combination => combination.every(index => cells[index] === mark)
  );
}

function isDraw() {
  return cells.every(cell => cell.length !== 0);
}

function endGame(mark) {
  gameboard.classList.remove(getOppositeMark(mark));
    gameboard.classList.add('presentation');
}