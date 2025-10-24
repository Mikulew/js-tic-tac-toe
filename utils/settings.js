import { HTML_ELEMENTS } from "../consts/index.js";
import { getHTMLElement } from "./getters.js";

const menuSection = getHTMLElement(HTML_ELEMENTS.MENU_VIEW);
const settingsSection = getHTMLElement(HTML_ELEMENTS.SETTINGS_VIEW);
const cancelButton = getHTMLElement(HTML_ELEMENTS.CANCEL_BUTTON);
const playButton = getHTMLElement(HTML_ELEMENTS.PLAY_BUTTON);

export function initSettings() {
  cancelButton.addEventListener("click", handleCancel);
  playButton.addEventListener("click", handlePlay);
}

function handleCancel() {
  settingsSection.classList.add("hide");
  menuSection.classList.remove("hide");
}

function handlePlay() {
  console.log("Hello from play button!");
}
