import {
  CLASS_NAME,
  GAME_TITLE,
  GAME_STATUS,
  MARK,
  HTML_ELEMENTS,
} from "../consts/index.js";

const DOM_ELEMENTS = {
  [HTML_ELEMENTS.MENU_VIEW]: document.getElementById("menu"),
  [HTML_ELEMENTS.GAMEBOARD_VIEW]: document.getElementById("gameboard"),
  [HTML_ELEMENTS.SECOND_PLAYER_BUTTON]: document.getElementById("secondPlayer"),
  [HTML_ELEMENTS.COMPUTER_PLAYER_BUTTON]: document.getElementById("computerPlayer"),
  [HTML_ELEMENTS.ABORT_GAME_BUTTON]: document.getElementById("abortGame"),
  [HTML_ELEMENTS.RESTART_GAME_BUTTON]: document.getElementById("restartGame"),
  [HTML_ELEMENTS.PLAYGROUND]: document.getElementById("playground"),
  [HTML_ELEMENTS.CELLS]: document.querySelectorAll("[data-cell]"),
  [HTML_ELEMENTS.TITLE]: document.getElementsByClassName("turn-title")[0],
};

export function getTitle(status) {
  return GAME_TITLE[status] ?? GAME_TITLE[GAME_STATUS.CROSS_TURN];
}

export function getOppositeMark(mark) {
  return mark === CLASS_NAME[MARK.CROSS] ? CLASS_NAME[MARK.NAUGHT] : CLASS_NAME[MARK.CROSS]; 
}

export function getHTMLElement(element) {
  return DOM_ELEMENTS[element];
}

export function refreshHTMLElement(element) {
  switch(element) {
    case HTML_ELEMENTS.CELLS: {
      DOM_ELEMENTS[element].forEach(cellElement => {
        const newCell = cellElement.cloneNode(true);
        cellElement.parentNode.replaceChild(newCell, cellElement);
      });
      DOM_ELEMENTS[element] = document.querySelectorAll("[data-cell]");
      return DOM_ELEMENTS[element];
    }
    default:
      return new Error("Unsupported HTML element");
  }
}

export function getEmptyMark(element) {
  const isCollection =
    Object.prototype.toString.call(element) === '[object NodeList]' ||
    Object.prototype.toString.call(element) === '[object HTMLCollection]';

  if (isCollection) {
    Array.from(element).forEach(e => {
      e.classList.remove(CLASS_NAME[MARK.CROSS]);
      e.classList.remove(CLASS_NAME[MARK.NAUGHT]);
    });
    return element;
  }

  element.classList.remove(CLASS_NAME[MARK.CROSS]);
  element.classList.remove(CLASS_NAME[MARK.NAUGHT]);
  return element;
}
