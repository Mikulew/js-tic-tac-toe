import {
  HTML_ELEMENTS,
  GAME_SETTINGS,
  PLAY_MODE,
  SETTINGS_OPTION_TYPES,
  BUTTON_TYPES,
} from "../consts/index.js";
import { initGame } from "./game.js";
import { hideSettings } from "./menu.js";
import {
  getHTMLElement,
  getSelectedKeyName,
  refreshGameSettings,
  refreshHTMLElement,
} from "./getters.js";

const cancelButton = getHTMLElement(HTML_ELEMENTS.CANCEL_BUTTON);
const playButton = getHTMLElement(HTML_ELEMENTS.PLAY_BUTTON);
let selectedMarkOption = getHTMLElement(HTML_ELEMENTS.SELECTED_MARK);
let firstMoveOption = getHTMLElement(HTML_ELEMENTS.FIRST_MOVE);
let gameDifficultyOption = getHTMLElement(HTML_ELEMENTS.GAME_DIFFICULTY);

export function initSettings() {
  refreshGameSettings(GAME_SETTINGS);
  selectedMarkOption = refreshHTMLElement(HTML_ELEMENTS.SELECTED_MARK);
  firstMoveOption = refreshHTMLElement(HTML_ELEMENTS.FIRST_MOVE);
  gameDifficultyOption = refreshHTMLElement(HTML_ELEMENTS.GAME_DIFFICULTY);
  cancelButton.addEventListener("click", handleCancel);
  playButton.addEventListener("click", handlePlay);
  selectedMarkOption.addEventListener("change", getSelectedOption);
  firstMoveOption.addEventListener("change", getSelectedOption);
  gameDifficultyOption.addEventListener("change", getSelectedOption);
}

export function checkSettingsValidation(settings) {
  try {
    if (settings === null) throw new Error("Settings argument must be provided");
    if (!checkSettingsPropertiesAreProvided(settings)) throw new Error("Object must have the appropriate structure");
    return true;
  } catch (err) {
    console.error("Settings validation failed:", err);
    return false;
  }
}

function checkSettingsPropertiesAreProvided(settings) {
  return Object.hasOwn(settings, SETTINGS_OPTION_TYPES.SELECTED_MARK) &&
    Object.hasOwn(settings, SETTINGS_OPTION_TYPES.FIRST_MOVE) &&
    Object.hasOwn(settings, SETTINGS_OPTION_TYPES.GAME_DIFFICULTY);
}

function handleCancel() {
  hideSettings(BUTTON_TYPES.CANCEL);
}

function handlePlay() {
  hideSettings(BUTTON_TYPES.PLAY);
  initGame(PLAY_MODE.WITH_COMPUTER, GAME_SETTINGS);
}

function getSelectedOption(e) {
  const settingsKey = getSelectedKeyName(e.target.name);
  GAME_SETTINGS[settingsKey] = e.target.value;
}
