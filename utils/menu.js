import { BUTTON_TYPES, HTML_ELEMENTS, PLAY_MODE } from "../consts/index.js";
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
    hideMenu(BUTTON_TYPES.SECOND_PLAYER);
  });
  computerPlayerButton.addEventListener("click", () => {
    initSettings();
    hideMenu(BUTTON_TYPES.COMPUTER_PLAYER);
  });
}

export function hideGameboard() {
  menuSection.classList.remove("hide");
  gameboardSection.classList.add("hide");
}

export function hideSettings(buttonType = null) {
  if (buttonType === null) throw new Error("buttonType argument must be provided");
  if (buttonType === BUTTON_TYPES.CANCEL) {
    menuSection.classList.remove("hide");
  } else if (buttonType === BUTTON_TYPES.PLAY) {
    gameboardSection.classList.remove("hide");
  } else {
    throw new Error("Unsupported settings' button");
  }
  settingsSection.classList.add("hide");
}

function hideMenu(buttonType = null) {
  if (buttonType === null) throw new Error("buttonType argument must be provided");
  if (buttonType === BUTTON_TYPES.SECOND_PLAYER) {
    gameboardSection.classList.remove("hide");
  } else if (buttonType === BUTTON_TYPES.COMPUTER_PLAYER) {
    settingsSection.classList.remove("hide");
  } else {
    throw new Error("Unsupported menu's button");
  }
  menuSection.classList.add("hide");
}
