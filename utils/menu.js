import { HTML_ELEMENTS } from "../consts/index.js";
import { initGame, restartGame } from "./game.js";
import { getHTMLElement } from "./getters.js";

const menuSection = getHTMLElement(HTML_ELEMENTS.MENU_VIEW);
const gameboardSection = getHTMLElement(HTML_ELEMENTS.GAMEBOARD_VIEW);
const secondPlayerButton = getHTMLElement(HTML_ELEMENTS.SECOND_PLAYER_BUTTON);
const computerPlayerButton = getHTMLElement(HTML_ELEMENTS.COMPUTER_PLAYER_BUTTON);
const abortGameButton = getHTMLElement(HTML_ELEMENTS.ABORT_GAME_BUTTON);
const restartGameButton = getHTMLElement(HTML_ELEMENTS.RESTART_GAME_BUTTON);

export const initMenu = () => {
  secondPlayerButton.addEventListener('click', () => {
    initGame();
    menuSection.classList.add('hide');
    gameboardSection.classList.remove('hide');
  });
  computerPlayerButton.addEventListener('click', () => console.log('Hello from second button!'));
  abortGameButton.addEventListener('click', () => {
    restartGame();
    gameboardSection.classList.add('hide');
    menuSection.classList.remove('hide');
  });
  restartGameButton.addEventListener('click', () => {
    restartGame();
    initGame();
  });
};