import {
  HTML_ELEMENTS,
  WINNING_COMBINATIONS,
  GAME_STATUS,
  GAME_STATUS_TYPES,
  MARK,
  PLAY_MODE,
  GAME_SETTINGS,
  TURN_TYPES,
  GAME_DIFFICULTY_TYPES,
} from "../consts/index.js";
import { getHTMLElement, refreshHTMLElement } from "./dom.js";
import {
  getOppositeMark,
  getEmptyMark,
  getClassName,
  getOppositeTurn,
} from "./gameHelpers.js";
import { findRandomEmptyCell, findWinningMove } from "./ai.js";
import { getTitle, getGameStatus } from "./gameStatus.js";
import { hideGameboard } from "./menu.js";
import { checkSettingsValidation } from "./settings.js";

const gameboard = getHTMLElement(HTML_ELEMENTS.PLAYGROUND);
const abortGameButton = getHTMLElement(HTML_ELEMENTS.ABORT_GAME_BUTTON);
const restartGameButton = getHTMLElement(HTML_ELEMENTS.RESTART_GAME_BUTTON);
let cellElements = getHTMLElement(HTML_ELEMENTS.CELLS);
let title = getHTMLElement(HTML_ELEMENTS.TITLE);

let cells = Array(9).fill("");
let currentMark = MARK.CROSS;
let gameStatus = GAME_STATUS.CROSS_TURN;
let currentMode = null;
let currentTurn = null;
let moveMade = false;
let difficulty = null;
let cellClickHandler = null;
let abortClickHandler = null;
let restartClickHandler = null;

export function initGame(mode, settings = null) {
  try {
    invokeGameInitilization(mode, settings);
  } catch (err) {
    console.error("Error in function invokeGameInitilization:", err);
    return;
  }

  cells = Array(9).fill("");
  currentMode = mode;
  cellElements = refreshHTMLElement(HTML_ELEMENTS.CELLS);
  getEmptyMark(cellElements);
  configureEventListeners();
  configureGameboard();
  updateRestartButtonState();

  if (currentMode === PLAY_MODE.WITH_COMPUTER && currentTurn === TURN_TYPES.COMPUTER) {
    computerMoves(currentMark);
  }
}

export function restartGame() {
  resetState();
  cellElements = refreshHTMLElement(HTML_ELEMENTS.CELLS);
  getEmptyMark(cellElements)
  configureGameboard();
  updateRestartButtonState();
};

function resetState() {
  cells = Array(9).fill("");
  currentMark =
    currentMode === PLAY_MODE.WITH_PLAYER
      ? MARK.CROSS
      : GAME_SETTINGS.SELECTED_MARK;
  gameStatus =
    currentMode === PLAY_MODE.WITH_PLAYER
      ? GAME_STATUS.CROSS_TURN
      : getGameStatus(currentMark, GAME_STATUS_TYPES.TURN);
}

function updateRestartButtonState() {
  const enabled = Array.isArray(cells) ? cells.some(cell => cell !== "") : false;
  moveMade = enabled;
  restartGameButton.disabled = !enabled;
}

function configureGameboard() {
  changeTitle(gameStatus);
  gameboard.classList.remove(getClassName(MARK.NAUGHT));
  gameboard.classList.remove(getClassName(MARK.CROSS));
  gameboard.classList.add(getClassName(currentMark));
}

function invokeGameInitilization(mode, settings) {
  if (mode === PLAY_MODE.WITH_PLAYER) {
    currentMark = MARK.CROSS;
    gameStatus = GAME_STATUS.CROSS_TURN;
    return;
  }

  if (mode === PLAY_MODE.WITH_COMPUTER && checkSettingsValidation(settings)) {
    currentMark = settings.SELECTED_MARK;
    currentTurn = settings.FIRST_MOVE;
    difficulty = settings.GAME_DIFFICULTY;

    gameStatus = getGameStatus(currentMark, GAME_STATUS_TYPES.TURN);
    return;
  }

  throw new Error("Unsupported play mode");
}

function handleCellClick(e) {
  const cell = e.target?.closest?.("[data-cell]") ?? e.target;
  if (!cell || !gameboard.contains(cell)) return;

  const index = Array.from(cellElements).indexOf(cell);
  if (index === -1 || cells[index] !== "") return;

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
  const cell = e.target?.closest?.("[data-cell]") ?? e.target;
  makeMove(cell, currentMark, index);
}

function configureGameListeners() {
  cellClickHandler = handleCellClick;
  abortClickHandler = handleAbortClick;
  restartClickHandler = handleRestartClick;

  gameboard.addEventListener("click", cellClickHandler);
  abortGameButton.addEventListener("click", abortClickHandler);
  restartGameButton.addEventListener("click", restartClickHandler);
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

  configureGameListeners();
}

function changeValue(index, value) {
  cells[index] = value;
}

function changeTitle(status) {
  title.textContent = getTitle(status);
}

function changeClass(cell, mark) {
  getEmptyMark(cell);
  cell.classList.add(getClassName(mark));
  gameboard.classList.remove(getClassName(mark));
  gameboard.classList.add(getClassName(getOppositeMark(mark)));
}

function changeTurn(mark) {
  currentMark = getOppositeMark(mark);
  gameStatus = getGameStatus(currentMark, GAME_STATUS_TYPES.TURN);
  changeTitle(gameStatus);
}

function makeMove(cell, mark, index) {
  changeValue(index, mark);
  changeClass(cell, mark);
  checkGameStatus(mark);
  updateRestartButtonState();
  if (currentMode === PLAY_MODE.WITH_COMPUTER) {
    currentTurn = getOppositeTurn(currentTurn);
    if (currentTurn === TURN_TYPES.COMPUTER) {
      computerMoves(currentMark);
    }
  }
}

function checkGameStatus(mark) {
  if (checkWin(mark)) {
    gameStatus = getGameStatus(mark, GAME_STATUS_TYPES.WIN);
    endGame(mark);
    return;
  }

  if (isDraw()) {
    gameStatus = GAME_STATUS.DRAW;
    endGame(mark);
    return;
  }

  changeTurn(mark);
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
  gameboard.classList.remove(getClassName(getOppositeMark(mark)));
  gameboard.classList.add("presentation");
}

function computerMoves(mark) {
  if (gameStatus !== GAME_STATUS.CROSS_TURN && gameStatus !== GAME_STATUS.NAUGHT_TURN) return;

  const opponentMark = getOppositeMark(mark);
  let moveIndex = -1;

  switch (difficulty) {
    case GAME_DIFFICULTY_TYPES.BASIC: {
      moveIndex = findRandomEmptyCell(cells);
      if (moveIndex !== -1) {
        return makeMove(cellElements[moveIndex], mark, moveIndex);
      }
    }
    case GAME_DIFFICULTY_TYPES.ADVANCED: {
      moveIndex = findWinningMove(cells, mark);
      if (moveIndex !== -1) {
        return makeMove(cellElements[moveIndex], mark, moveIndex);
      }

      moveIndex = findWinningMove(cells, opponentMark);
      if (moveIndex !== -1) {
        return makeMove(cellElements[moveIndex], mark, moveIndex);
      }

      moveIndex = findRandomEmptyCell(cells);
      if (moveIndex !== -1) {
        makeMove(cellElements[moveIndex], mark, moveIndex);
      }
      return;
    }
    default: throw new Error("Unsupported game difficulty");
  }
}
