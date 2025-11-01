import { HTML_ELEMENTS, GAME_SETTINGS } from "../consts/index.js";
import { getHTMLElement, refreshGameSettings, refreshHTMLElement } from "./getters.js";

const menuSection = getHTMLElement(HTML_ELEMENTS.MENU_VIEW);
const settingsSection = getHTMLElement(HTML_ELEMENTS.SETTINGS_VIEW);
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

function handleCancel() {
  settingsSection.classList.add("hide");
  menuSection.classList.remove("hide");
}

function handlePlay() {
  console.log("Game settings: ", GAME_SETTINGS);
}

function getSelectedOption(e) {
  GAME_SETTINGS[e.target.name] = e.target.value;
}
