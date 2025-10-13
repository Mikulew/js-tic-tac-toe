import {
  HTML_ELEMENTS,
  CLASS_NAME,
  WINNING_COMBINATIONS,
  GAME_STATUS,
  MARK,
} from "../consts/index.js";
import {
  getHTMLElement,
  getTitle,
  getOppositeMark,
  refreshHTMLElement,
  getEmptyMark,
} from "./getters.js";

const gameboard = getHTMLElement(HTML_ELEMENTS.PLAYGROUND);
let cellElements = getHTMLElement(HTML_ELEMENTS.CELLS);
let title = getHTMLElement(HTML_ELEMENTS.TITLE);

let currentMark = CLASS_NAME[MARK.CROSS];
let gameStatus = GAME_STATUS.CROSS_TURN;
let cells = ["", "", "", "", "", "", "", "", ""];

export const initGame = () => {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentMark = CLASS_NAME[MARK.CROSS];
  gameStatus = GAME_STATUS.CROSS_TURN;
  changeTitle(gameStatus);
  gameboard.classList.add(currentMark);
  cellElements = refreshHTMLElement(HTML_ELEMENTS.CELLS);
  getEmptyMark(cellElements);
  cellElements.forEach((cellElement, index) => cellElement.addEventListener('click', e => handleClick(e, index), { once: true }));
}

export const restartGame = () => {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentMark = CLASS_NAME[MARK.CROSS];
  gameStatus = GAME_STATUS.CROSS_TURN;
  cellElements = refreshHTMLElement(HTML_ELEMENTS.CELLS);
  cellElements = getEmptyMark(cellElements)
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
    changeTitle(gameStatus);
  }
}

function changeValue(index, value) {
  cells[index] = value;
}

function changeMark(newMark) {
  return currentMark = newMark; 
}

function changeTitle(status) {
  title.textContent = getTitle(status);
}

function changeClass(cell, mark) {
  getEmptyMark(cell);
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
  changeTitle(gameStatus);
  gameboard.classList.remove(getOppositeMark(mark));
  gameboard.classList.add('presentation');
}
