import {
  CLASS_NAME,
  GAME_TITLE,
  GAME_STATUS,
  GAME_STATUS_TYPES,
  MARK,
  HTML_ELEMENTS,
  GAME_DEFAULT_SETTINGS,
  SELECT_NAMES,
  TURN_TYPES,
  WINNING_COMBINATIONS,
} from "../consts/index.js";

const DOM_ELEMENTS = {
  [HTML_ELEMENTS.MENU_VIEW]: document.getElementById("menu"),
  [HTML_ELEMENTS.GAMEBOARD_VIEW]: document.getElementById("gameboard"),
  [HTML_ELEMENTS.SETTINGS_VIEW]: document.getElementById("settings"),
  [HTML_ELEMENTS.SECOND_PLAYER_BUTTON]: document.getElementById("secondPlayer"),
  [HTML_ELEMENTS.COMPUTER_PLAYER_BUTTON]: document.getElementById("computerPlayer"),
  [HTML_ELEMENTS.CANCEL_BUTTON]: document.getElementById("cancel"),
  [HTML_ELEMENTS.PLAY_BUTTON]: document.getElementById("playGame"),
  [HTML_ELEMENTS.ABORT_GAME_BUTTON]: document.getElementById("abortGame"),
  [HTML_ELEMENTS.RESTART_GAME_BUTTON]: document.getElementById("restartGame"),
  [HTML_ELEMENTS.PLAYGROUND]: document.getElementById("playground"),
  [HTML_ELEMENTS.CELLS]: document.querySelectorAll("[data-cell]"),
  [HTML_ELEMENTS.TITLE]: document.getElementsByClassName("turn-title")[0],
  [HTML_ELEMENTS.SELECTED_MARK]: document.getElementById("selectedMark"),
  [HTML_ELEMENTS.FIRST_MOVE]: document.getElementById("firstMove"),
  [HTML_ELEMENTS.GAME_DIFFICULTY]: document.getElementById("gameDifficulty"),
};

export function getTitle(status) {
  return GAME_TITLE[status] ?? GAME_TITLE[GAME_STATUS.CROSS_TURN];
}

export function getOppositeMark(mark) {
  return mark === MARK.CROSS ? MARK.NAUGHT : MARK.CROSS;
}

export function getOppositeTurn(turn) {
  return turn === TURN_TYPES.COMPUTER ? TURN_TYPES.PLAYER : TURN_TYPES.COMPUTER;
}

export function getClassName(mark) {
  return mark === MARK.CROSS ? CLASS_NAME[MARK.CROSS] : CLASS_NAME[MARK.NAUGHT];
}

export function getHTMLElement(element) {
  return DOM_ELEMENTS[element];
}

export function refreshHTMLElement(element) {
  switch (element) {
    case HTML_ELEMENTS.CELLS:
      return refreshCellElements();
    case HTML_ELEMENTS.SELECTED_MARK:
    case HTML_ELEMENTS.FIRST_MOVE:
    case HTML_ELEMENTS.GAME_DIFFICULTY:
      return refreshSingleElement(element);
    default:
      throw new Error(`Unsupported HTML element: ${element}`);
  }
}

function refreshCellElements() {
  DOM_ELEMENTS[HTML_ELEMENTS.CELLS].forEach(cellElement => {
    const newCell = cellElement.cloneNode(true);
    cellElement.parentNode.replaceChild(newCell, cellElement);
  });
  DOM_ELEMENTS[HTML_ELEMENTS.CELLS] = document.querySelectorAll("[data-cell]");
  return DOM_ELEMENTS[HTML_ELEMENTS.CELLS];
}

function refreshSingleElement(element) {
  const oldNode = DOM_ELEMENTS[element];
  if (!oldNode?.parentNode) return null;

  const newNode = oldNode.cloneNode(true);
  oldNode.parentNode.replaceChild(newNode, oldNode);
  DOM_ELEMENTS[element] = newNode;
  return newNode;
}

export function getEmptyMark(element) {
  if (isNodeCollection(element)) {
    Array.from(element).forEach(el => clearMarkClasses(el));
    return element;
  }
  clearMarkClasses(element);
  return element;
}

function clearMarkClasses(element) {
  element.classList.remove(getClassName(MARK.CROSS));
  element.classList.remove(getClassName(MARK.NAUGHT));
}

function isNodeCollection(element) {
  const proto = Object.prototype.toString.call(element);
  return proto === "[object NodeList]" || proto === "[object HTMLCollection]";
}

export function refreshGameSettings(settings) {
  for (let [key] of settings) {
    settings[key] = GAME_DEFAULT_SETTINGS[key];
  }
}

export function getSelectedKeyName(keyName) {
  return SELECT_NAMES[keyName];
}

export function getGameStatus(mark, type) {
  switch (type) {
    case GAME_STATUS_TYPES.TURN:
      return mark === MARK.CROSS ? GAME_STATUS.CROSS_TURN : GAME_STATUS.NAUGHT_TURN;
    case GAME_STATUS_TYPES.WIN:
      return mark === MARK.CROSS ? GAME_STATUS.CROSS_WINS : GAME_STATUS.NAUGHT_WINS;
    default:
      throw new Error(`Unsupported type argument: ${type}`);
  }
}

export function findRandomEmptyCell(cells) {
  const emptyCells = cells
    .map((cell, index) => (cell === "" ? index : -1))
    .filter(index => index !== -1);

  if (emptyCells.length === 0) return -1;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

export function findWinningMove(cells, mark) {
  for (const combination of WINNING_COMBINATIONS) {
    const filledCells = combination.filter(index => cells[index] === mark);
    const emptyCells = combination.filter(index => cells[index] === "");

    if (filledCells.length === 2 && emptyCells.length === 1) {
      return emptyCells[0];
    }
  }
  return -1;
}
