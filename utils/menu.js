import { HTML_ELEMENTS, PLAY_MODE } from "../consts/index.js";
import { initGame } from "./game.js";
import { initSettings } from "./settings.js";
import { getHTMLElement } from "./getters.js";

const menuSection = getHTMLElement(HTML_ELEMENTS.MENU_VIEW);
const gameboardSection = getHTMLElement(HTML_ELEMENTS.GAMEBOARD_VIEW);
const settingsSection = getHTMLElement(HTML_ELEMENTS.SETTINGS_VIEW);
const secondPlayerButton = getHTMLElement(HTML_ELEMENTS.SECOND_PLAYER_BUTTON);
const computerPlayerButton = getHTMLElement(HTML_ELEMENTS.COMPUTER_PLAYER_BUTTON);

export function initMenu() {
  secondPlayerButton.addEventListener("click", () => {
    initGame(PLAY_MODE.WITH_PLAYER);
    menuSection.classList.add("hide");
    gameboardSection.classList.remove("hide");
  });
  computerPlayerButton.addEventListener("click", () => {
    initSettings();
    menuSection.classList.add("hide");
    settingsSection.classList.remove("hide");
  });
}

export function hideMenu() {
  menuSection.classList.remove("hide");
  gameboardSection.classList.add("hide");
}

export function hideSettingsInvokedByCancelButton() {
  settingsSection.classList.add("hide");
  menuSection.classList.remove("hide");
}

export function hideSettingsInvokedByPlayButton() {
  settingsSection.classList.add("hide");
  gameboardSection.classList.remove("hide");
}
