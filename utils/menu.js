import { HTML_ELEMENTS } from "../consts/index.js";
import { initGame, restartGame } from "./game.js";
import { initSettings } from "./settings.js";
import { getHTMLElement } from "./getters.js";

const menuSection = getHTMLElement(HTML_ELEMENTS.MENU_VIEW);
const gameboardSection = getHTMLElement(HTML_ELEMENTS.GAMEBOARD_VIEW);
const settingsSection = getHTMLElement(HTML_ELEMENTS.SETTINGS_VIEW);
const secondPlayerButton = getHTMLElement(HTML_ELEMENTS.SECOND_PLAYER_BUTTON);
const computerPlayerButton = getHTMLElement(HTML_ELEMENTS.COMPUTER_PLAYER_BUTTON);
const abortGameButton = getHTMLElement(HTML_ELEMENTS.ABORT_GAME_BUTTON);
const restartGameButton = getHTMLElement(HTML_ELEMENTS.RESTART_GAME_BUTTON);

export function initMenu() {
  secondPlayerButton.addEventListener("click", () => {
    initGame();
    menuSection.classList.add("hide");
    gameboardSection.classList.remove("hide");
  });
  computerPlayerButton.addEventListener("click", () => {
    initSettings();
    menuSection.classList.add("hide");
    settingsSection.classList.remove("hide");
  });
  abortGameButton.addEventListener("click", () => {
    restartGame();
    menuSection.classList.remove("hide");
    gameboardSection.classList.add("hide");
  });
  restartGameButton.addEventListener("click", () => {
    restartGame();
    initGame();
  });
};
