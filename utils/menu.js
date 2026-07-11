import { BUTTON_TYPES, HTML_ELEMENTS, PLAY_MODE } from "../consts/index.js";
import { initGame } from "./game.js";
import { initSettings } from "./settings.js";
import { getHTMLElement } from "./dom.js";

const menuSection = getHTMLElement(HTML_ELEMENTS.MENU_VIEW);
const gameboardSection = getHTMLElement(HTML_ELEMENTS.GAMEBOARD_VIEW);
const settingsSection = getHTMLElement(HTML_ELEMENTS.SETTINGS_VIEW);
const secondPlayerButton = getHTMLElement(HTML_ELEMENTS.SECOND_PLAYER_BUTTON);
const computerPlayerButton = getHTMLElement(HTML_ELEMENTS.COMPUTER_PLAYER_BUTTON);

const VIEW_TRANSITIONS = {
  [BUTTON_TYPES.SECOND_PLAYER]: {
    show: gameboardSection,
    hide: menuSection,
    action: () => initGame(PLAY_MODE.WITH_PLAYER),
  },
  [BUTTON_TYPES.COMPUTER_PLAYER]: {
    show: settingsSection,
    hide: menuSection,
    action: () => initSettings(),
  },
  [BUTTON_TYPES.CANCEL]: {
    show: menuSection,
    hide: settingsSection,
  },
  [BUTTON_TYPES.PLAY]: {
    show: gameboardSection,
    hide: settingsSection,
  },
};

function showView(element) {
  if (!element) return;
  element.classList.remove("hide");
}

function hideView(element) {
  if (!element) return;
  element.classList.add("hide");
}

export function initMenu() {
  secondPlayerButton.addEventListener("click", () => handleNavigation(BUTTON_TYPES.SECOND_PLAYER));
  computerPlayerButton.addEventListener("click", () => handleNavigation(BUTTON_TYPES.COMPUTER_PLAYER));
}

export function hideGameboard() {
  showView(menuSection);
  hideView(gameboardSection);
}

export function handleNavigation(buttonType = null) {
  if (!buttonType) {
    throw new Error("buttonType argument must be provided");
  }

  const transition = VIEW_TRANSITIONS[buttonType];
  if (!transition) {
    throw new Error(`Unsupported menu button: ${buttonType}`);
  }

  if (transition.action) {
    transition.action();
  }

  showView(transition.show);
  hideView(transition.hide);
}
