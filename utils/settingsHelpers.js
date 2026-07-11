import { GAME_DEFAULT_SETTINGS, SELECT_NAMES } from "../consts/index.js";

export function refreshGameSettings(settings) {
  for (let [key] of settings) {
    settings[key] = GAME_DEFAULT_SETTINGS[key];
  }
}

export function getSelectedKeyName(keyName) {
  return SELECT_NAMES[keyName];
}
