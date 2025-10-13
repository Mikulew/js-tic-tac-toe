import {
  CLASS_NAME,
  CROSS_TITLE,
  NAUGHT_TITLE,
  DRAW_TITLE,
  WINNER_TITLE,
  GAME_STATUS,
  MARK,
  HTML_ELEMENTS,
} from "../consts/index.js";
import { isArrayLike } from "./utilities.js";

const menuSection = document.getElementById("menu");
const gameboardSection = document.getElementById("gameboard");
const secondPlayerButton = document.getElementById("secondPlayer");
const computerPlayerButton = document.getElementById("computerPlayer");
const abortGameButton = document.getElementById("abortGame");
const restartGameButton = document.getElementById("restartGame");
let cellElements = document.querySelectorAll("[data-cell]");
const gameboard = document.getElementById("playground");
let title = document.getElementsByClassName("turn-title")[0];

export function getTitle(status) {
  switch(status) {
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

export function getOppositeMark(mark) {
  return mark === CLASS_NAME[MARK.CROSS] ? CLASS_NAME[MARK.NAUGHT] : CLASS_NAME[MARK.CROSS]; 
}

export function getHTMLElement(element) {
  switch(element) {
    case HTML_ELEMENTS.MENU_VIEW:
      return menuSection;
    case HTML_ELEMENTS.GAMEBOARD_VIEW:
      return gameboardSection;
    case HTML_ELEMENTS.SECOND_PLAYER_BUTTON:
      return secondPlayerButton;
    case HTML_ELEMENTS.COMPUTER_PLAYER_BUTTON:
      return computerPlayerButton;
    case HTML_ELEMENTS.ABORT_GAME_BUTTON:
      return abortGameButton;
    case HTML_ELEMENTS.RESTART_GAME_BUTTON:
      return restartGameButton;
    case HTML_ELEMENTS.PLAYGROUND:
      return gameboard;
    case HTML_ELEMENTS.CELLS:
      return cellElements;
    case HTML_ELEMENTS.TITLE:
      return title;
  }
}

export function refreshHTMLElement(element) {
  switch(element) {
    case HTML_ELEMENTS.CELLS: {
      cellElements.forEach(cellElement => {
        const newCell = cellElement.cloneNode(true);
        cellElement.parentNode.replaceChild(newCell, cellElement);
      });
      cellElements = document.querySelectorAll("[data-cell]");
      return cellElements;
    }
    default:
      return new Error("Unsupported HTML element");
  }
}

export function getEmptyMark(element) {
  if (isArrayLike(element)) {
    const newElement = [...element];
    newElement.forEach(e => {
      e.classList.remove(CLASS_NAME[MARK.CROSS]);
      e.classList.remove(CLASS_NAME[MARK.NAUGHT]);
    });
    return newElement;
  }
  element.classList.remove(CLASS_NAME[MARK.CROSS]);
  element.classList.remove(CLASS_NAME[MARK.NAUGHT]);
}