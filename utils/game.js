import {
  HTML_ELEMENTS,
  CLASS_NAME,
  WINNING_COMBINATIONS,
  GAME_STATUS,
  MARK,
  PLAY_MODE,
  CROSS_CLASS,
  GAME_SETTINGS,
} from "../consts/index.js";
import {
  getHTMLElement,
  getTitle,
  getOppositeMark,
  refreshHTMLElement,
  getEmptyMark,
} from "./getters.js";
import { hideGameboard } from "./menu.js";
import { checkSettingsValidation } from "./settings.js";

const gameboard = getHTMLElement(HTML_ELEMENTS.PLAYGROUND);
const abortGameButton = getHTMLElement(HTML_ELEMENTS.ABORT_GAME_BUTTON);
const restartGameButton = getHTMLElement(HTML_ELEMENTS.RESTART_GAME_BUTTON);
let cellElements = getHTMLElement(HTML_ELEMENTS.CELLS);
let title = getHTMLElement(HTML_ELEMENTS.TITLE);

let currentMark = CLASS_NAME[MARK.CROSS];
let gameStatus = GAME_STATUS.CROSS_TURN;
let currentMode = null;
let cells = Array(9).fill("");
let cellClickHandler = null;
let abortClickHandler = null;
let restartClickHandler = null;

export function initGame(mode, settings = null) {
  try {
    invokeGameInitilization(mode, settings);
  } catch (err) {
    console.error('Error in function invokeGameInitilization:', err);
    return;
  }

  cells = Array(9).fill("");
  currentMode = mode;
  cellElements = refreshHTMLElement(HTML_ELEMENTS.CELLS);
  getEmptyMark(cellElements);
  configureEventListeners();
  configureGameboard();
}

export function restartGame() {
  resetState();
  cellElements = refreshHTMLElement(HTML_ELEMENTS.CELLS);
  getEmptyMark(cellElements)
  gameboard.classList.remove(CLASS_NAME[MARK.NAUGHT]);
  gameboard.classList.remove(CLASS_NAME[MARK.CROSS]);
  configureGameboard();
};

function resetState() {
  cells = Array(9).fill("");
  currentMark = currentMode === PLAY_MODE.WITH_PLAYER ? CLASS_NAME[MARK.CROSS] : GAME_SETTINGS.SELECTED_MARK;
  gameStatus = currentMode === PLAY_MODE.WITH_PLAYER ? GAME_STATUS.CROSS_TURN : (currentMark === CROSS_CLASS ? GAME_STATUS.CROSS_TURN : GAME_STATUS.NAUGHT_TURN);
}

function configureGameboard() {
  changeTitle(gameStatus);
  gameboard.classList.add(currentMark);
}

function invokeGameInitilization(mode, settings) {
  if (mode === PLAY_MODE.WITH_PLAYER) {
    currentMark = CLASS_NAME[MARK.CROSS];
    gameStatus = GAME_STATUS.CROSS_TURN;
    return;
  } if (mode === PLAY_MODE.WITH_COMPUTER && checkSettingsValidation(settings)) {
    currentMark = settings.SELECTED_MARK;
    gameStatus = currentMark === CROSS_CLASS ? GAME_STATUS.CROSS_TURN : GAME_STATUS.NAUGHT_TURN;
    return;
  } else {
    throw new Error("Unsupported play mode");
  }
}

function handleCellClick(e) {
  const cell = e.target.closest("[data-cell]");
  if (!cell || !gameboard.contains(cell)) return;

  const index = Array.from(cellElements).indexOf(cell);
  if (index === -1) return;
  if (cells[index] !== "") return;
  handleClick(e, index);
}

function handleAbortClick() {
  restartGame();
  hideGameboard();
}

function handleRestartClick() {
  restartGame();
  initGame(currentMode, GAME_SETTINGS);
}

function handleClick(e, index) {
  if (gameStatus !== GAME_STATUS.CROSS_TURN && gameStatus !== GAME_STATUS.NAUGHT_TURN) return;

  e.stopPropagation();
  const cell = e.target;
  const mark = currentMark;
  changeValue(index, mark);
  changeClass(cell, mark);

  if (checkWin(mark)) {
    gameStatus = mark === CLASS_NAME[MARK.CROSS] ? GAME_STATUS.CROSS_WINS : GAME_STATUS.NAUGHT_WINS;
    endGame(mark);
    return;
  }
  
  if (isDraw()) {
    gameStatus = GAME_STATUS.DRAW;
    endGame(mark);
    return;
  }

  currentMark = getOppositeMark(mark);
  gameStatus = currentMark === CLASS_NAME[MARK.NAUGHT] ? GAME_STATUS.NAUGHT_TURN : GAME_STATUS.CROSS_TURN;
  changeTitle(gameStatus);
  return;
}

function configureEventListeners() {
  if (cellClickHandler) {
    gameboard.removeEventListener("click", cellClickHandler);
    cellClickHandler = null;
  }
  if (abortClickHandler) {
    abortGameButton.removeEventListener("click", abortClickHandler);
    abortClickHandler = null;
  }
  if (restartClickHandler) {
    restartGameButton.removeEventListener("click", restartClickHandler);
    restartClickHandler = null;
  }

  cellClickHandler = handleCellClick;
  abortClickHandler = handleAbortClick;
  restartClickHandler = handleRestartClick;

  gameboard.addEventListener("click", cellClickHandler);
  abortGameButton.addEventListener("click", abortClickHandler);
  restartGameButton.addEventListener("click", restartClickHandler);
}

function changeValue(index, value) {
  cells[index] = value;
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
  gameboard.classList.add("presentation");
}
