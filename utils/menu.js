import { initGame, abortGame } from "./game.js";

const menuSection = document.getElementById("menu");
const gameboardSection = document.getElementById("gameboard");
const secondPlayerButton = document.getElementById("secondPlayer");
const computerPlayerButton = document.getElementById("computerPlayer");
const abortGameButton = document.getElementById("abortGame");

export const initMenu = () => {
  secondPlayerButton.addEventListener('click', () => {
    initGame();
    menuSection.classList.add('hide');
    gameboardSection.classList.remove('hide');
  });
  computerPlayerButton.addEventListener('click', () => console.log('Hello from second button!'));
  abortGameButton.addEventListener('click', () => {
    abortGame();
    gameboardSection.classList.add('hide');
    menuSection.classList.remove('hide');
  });
};