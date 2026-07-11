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

const cancelButton = getHTMLElement(HTML_ELEMENTS.CANCEL_BUTTON);
const playButton = getHTMLElement(HTML_ELEMENTS.PLAY_BUTTON);
let selectedMarkOption = getHTMLElement(HTML_ELEMENTS.SELECTED_MARK);
let firstMoveOption = getHTMLElement(HTML_ELEMENTS.FIRST_MOVE);
let gameDifficultyOption = getHTMLElement(HTML_ELEMENTS.GAME_DIFFICULTY);

let cancelHandler = null;
let playHandler = null;
let changeHandler = null;

export function initSettings() {
  refreshGameSettings(GAME_SETTINGS);
  selectedMarkOption = refreshHTMLElement(HTML_ELEMENTS.SELECTED_MARK);
  firstMoveOption = refreshHTMLElement(HTML_ELEMENTS.FIRST_MOVE);
  gameDifficultyOption = refreshHTMLElement(HTML_ELEMENTS.GAME_DIFFICULTY);
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
  cancelHandler = handleCancel;
  playHandler = handlePlay;
  changeHandler = handleOptionChange;

  cancelButton.addEventListener("click", cancelHandler);
  playButton.addEventListener("click", playHandler);
  selectedMarkOption.addEventListener("change", changeHandler);
  firstMoveOption.addEventListener("change", changeHandler);
  gameDifficultyOption.addEventListener("change", changeHandler);
}

function configureEventListeners() {
  if (cancelHandler) {
    cancelButton.removeEventListener("click", cancelHandler);
    cancelHandler = null;
  }

  if (playHandler) {
    playButton.removeEventListener("click", playHandler);
    playHandler = null;
  }

  if (changeHandler) {
    selectedMarkOption.removeEventListener("change", changeHandler);
    firstMoveOption.removeEventListener("change", changeHandler);
    gameDifficultyOption.removeEventListener("change", changeHandler);
    changeHandler = null;
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
