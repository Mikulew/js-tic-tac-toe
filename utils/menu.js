import { BUTTON_TYPES, HTML_ELEMENTS, PLAY_MODE } from "../consts/index.js";
import { initGame } from "./game.js";
import { initSettings } from "./settings.js";
import { getHTMLElement } from "./dom.js";

const DOM = {
  menuSection: getHTMLElement(HTML_ELEMENTS.MENU_VIEW),
  gameboardSection: getHTMLElement(HTML_ELEMENTS.GAMEBOARD_VIEW),
  settingsSection: getHTMLElement(HTML_ELEMENTS.SETTINGS_VIEW),
  secondPlayerButton: getHTMLElement(HTML_ELEMENTS.SECOND_PLAYER_BUTTON),
  computerPlayerButton: getHTMLElement(HTML_ELEMENTS.COMPUTER_PLAYER_BUTTON),
};

const VIEW_TRANSITIONS = {
  [BUTTON_TYPES.SECOND_PLAYER]: {
    show: DOM.gameboardSection,
    hide: DOM.menuSection,
    action: () => initGame(PLAY_MODE.WITH_PLAYER),
  },
  [BUTTON_TYPES.COMPUTER_PLAYER]: {
    show: DOM.settingsSection,
    hide: DOM.menuSection,
    action: () => initSettings(),
  },
  [BUTTON_TYPES.CANCEL]: {
    show: DOM.menuSection,
    hide: DOM.settingsSection,
  },
  [BUTTON_TYPES.PLAY]: {
    show: DOM.gameboardSection,
    hide: DOM.settingsSection,
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
  DOM.secondPlayerButton.addEventListener("click", () => handleNavigation(BUTTON_TYPES.SECOND_PLAYER));
  DOM.computerPlayerButton.addEventListener("click", () => handleNavigation(BUTTON_TYPES.COMPUTER_PLAYER));
}

export function hideGameboard() {
  showView(DOM.menuSection);
  hideView(DOM.gameboardSection);
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
