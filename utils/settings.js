import {
  HTML_ELEMENTS,
  GAME_SETTINGS,
  PLAY_MODE,
  SETTINGS_OPTION_TYPES,
  BUTTON_TYPES,
  REQUIRED_SETTINGS_KEYS,
} from "../consts/index.js";
import { initGame } from "./game.js";
import { handleNavigation } from "./menu.js";
import { getHTMLElement, refreshHTMLElement } from "./dom.js";
import { getSelectedKeyName, refreshGameSettings } from "./settingsHelpers.js"

const DOM = {
  cancelButton: getHTMLElement(HTML_ELEMENTS.CANCEL_BUTTON),
  playButton: getHTMLElement(HTML_ELEMENTS.PLAY_BUTTON),
  selectedMarkOption: getHTMLElement(HTML_ELEMENTS.SELECTED_MARK),
  firstMoveOption: getHTMLElement(HTML_ELEMENTS.FIRST_MOVE),
  gameDifficultyOption: getHTMLElement(HTML_ELEMENTS.GAME_DIFFICULTY),
};
const handlers = {
  cancel: null,
  play: null,
  change: null,
};

export function initSettings() {
  refreshGameSettings(GAME_SETTINGS);
  DOM.selectedMarkOption = refreshHTMLElement(HTML_ELEMENTS.SELECTED_MARK);
  DOM.firstMoveOption = refreshHTMLElement(HTML_ELEMENTS.FIRST_MOVE);
  DOM.gameDifficultyOption = refreshHTMLElement(HTML_ELEMENTS.GAME_DIFFICULTY);
  configureEventListeners();
}

export function checkSettingsValidation(settings) {
  try {
    if (!settings) {
      throw new Error("Settings argument must be provided");
    }
    if (!checkSettingsPropertiesAreProvided(settings)) {
      throw new Error("Object must have the appropriate structure");
    }
    return true;
  } catch (err) {
    console.error("Settings validation failed:", err);
    return false;
  }
}

function checkSettingsPropertiesAreProvided(settings) {
  return REQUIRED_SETTINGS_KEYS.every(key => Object.hasOwn(settings, key));
}

function configureSettingsListeners() {
  handlers.cancel = handleCancel;
  handlers.play = handlePlay;
  handlers.change = handleOptionChange;

  DOM.cancelButton.addEventListener("click", handlers.cancel);
  DOM.playButton.addEventListener("click", handlers.play);
  DOM.selectedMarkOption.addEventListener("change", handlers.change);
  DOM.firstMoveOption.addEventListener("change", handlers.change);
  DOM.gameDifficultyOption.addEventListener("change", handlers.change);
}

function configureEventListeners() {
  if (handlers.cancel) {
    DOM.cancelButton.removeEventListener("click", handlers.cancel);
    handlers.cancel = null;
  }

  if (handlers.play) {
    DOM.playButton.removeEventListener("click", handlers.play);
    handlers.play = null;
  }

  if (handlers.change) {
    DOM.selectedMarkOption.removeEventListener("change", handlers.change);
    DOM.firstMoveOption.removeEventListener("change", handlers.change);
    DOM.gameDifficultyOption.removeEventListener("change", handlers.change);
    handlers.change = null;
  }

  configureSettingsListeners();
}

function handleCancel() {
  handleNavigation(BUTTON_TYPES.CANCEL);
}

function handlePlay() {
  if (!checkSettingsValidation(GAME_SETTINGS)) {
    console.error("Invalid settings: cannot proceed to game");
    return;
  }
  handleNavigation(BUTTON_TYPES.PLAY);
  initGame(PLAY_MODE.WITH_COMPUTER, GAME_SETTINGS);
}

function handleOptionChange(e) {
  const { name, value } = e.target;
  const settingsKey = getSelectedKeyName(name);

  if (!settingsKey) {
    console.error(`Unknown settings option: ${name}`);
    return;
  }

  GAME_SETTINGS[settingsKey] = value;
}
