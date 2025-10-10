import {
  CLASS_NAME,
  CROSS_TITLE,
  NAUGHT_TITLE,
  DRAW_TITLE,
  WINNER_TITLE,
  WINNING_COMBINATIONS,
  GAME_STATUS,
  MARK,
} from "../consts/index.js";

const cellElements = document.querySelectorAll("[data-cell]");
const gameboard = document.getElementById("playground");
let title = document.getElementsByClassName("turn-title")[0];
let currentMark = CLASS_NAME[MARK.CROSS];
let gameStatus = GAME_STATUS.CROSS_TURN;
let cells = ["", "", "", "", "", "", "", "", ""];

export const initGame = () => {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentMark = CLASS_NAME[MARK.CROSS];
  gameStatus = GAME_STATUS.CROSS_TURN;
  changeTitle();
  gameboard.classList.add(currentMark);
  cellElements.forEach((cellElement, index) => {
    cellElement.addEventListener('click', e => handleClick(e, index), { once: true });
  });
};

export const abortGame = () => {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentMark = CLASS_NAME[MARK.CROSS];
  gameStatus = GAME_STATUS.CROSS_TURN;
  cellElements.forEach(cellElement => {
    cellElement.classList.remove(CLASS_NAME[MARK.CROSS]);
    cellElement.classList.remove(CLASS_NAME[MARK.NAUGHT]);
  });
  removeClickHandlers();
  gameboard.classList.remove(CLASS_NAME[MARK.NAUGHT]);
  gameboard.classList.remove(CLASS_NAME[MARK.NAUGHT]);
};

function handleClick(e, index) {
  if (gameStatus === GAME_STATUS.NAUGHT_TURN || gameStatus === GAME_STATUS.CROSS_TURN) {
    e.stopPropagation();
    const cell = e.target;
    const mark = currentMark;
    changeValue(index, mark);
    changeClass(cell, mark);
    if (checkWin(mark)) {
      const wonMark = mark === CLASS_NAME[MARK.CROSS] ? GAME_STATUS.CROSS_WINS : GAME_STATUS.NAUGHT_WINS; 
      gameStatus = wonMark;
      return endGame(mark);
    } else if (isDraw()) {
      gameStatus = GAME_STATUS.DRAW;
      return endGame(mark);
    }
    gameStatus = getOppositeMark(mark) === CLASS_NAME[MARK.NAUGHT] ? GAME_STATUS.NAUGHT_TURN : GAME_STATUS.CROSS_TURN;
    changeMark(getOppositeMark(mark));
    changeTitle();
  }
}


function changeValue(index, value) {
  cells[index] = value;
}

function changeMark(newMark) {
  return currentMark = newMark; 
}

function changeTitle() {
  title.textContent = getTitle();
}

function getTitle() {
  switch(gameStatus) {
    case GAME_STATUS.CROSS_TURN:
      return CROSS_TITLE;
    case GAME_STATUS.NAUGHT_TURN:
      return NAUGHT_TITLE;
    case GAME_STATUS.CROSS_WINS:
      return WINNER_TITLE(MARK.CROSS);
    case GAME_STATUS.NAUGHT_WINS:
      return WINNER_TITLE(MARK.NAUGHT);
    case GAME_STATUS.DRAW:
      return DRAW_TITLE;
    default:
      return CROSS_TITLE;
  }
}

function getOppositeMark(mark) {
  return mark === CLASS_NAME[MARK.CROSS] ? CLASS_NAME[MARK.NAUGHT] : CLASS_NAME[MARK.CROSS]; 
}

function changeClass(cell, mark) {
  cell.classList.remove(CLASS_NAME[MARK.CROSS]);
  cell.classList.remove(CLASS_NAME[MARK.NAUGHT]);
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
  changeTitle();
  gameboard.classList.remove(getOppositeMark(mark));
  gameboard.classList.add('presentation');
}

function removeClickHandlers() { 
  cellElements.forEach(cellElement => {
    cellElement.classList.remove(CLASS_NAME[MARK.CROSS]);
    cellElement.classList.remove(CLASS_NAME[MARK.NAUGHT]);
  })
}