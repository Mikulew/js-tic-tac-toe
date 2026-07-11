import { HTML_ELEMENTS } from "../consts/index.js";

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
