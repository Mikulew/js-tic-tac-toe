import { initGame, restartGame } from "./game.js";

const menuSection = document.getElementById("menu");
const gameboardSection = document.getElementById("gameboard");
const secondPlayerButton = document.getElementById("secondPlayer");
const computerPlayerButton = document.getElementById("computerPlayer");
const abortGameButton = document.getElementById("abortGame");
const restartGameButton = document.getElementById("restartGame");

export const initMenu = () => {
  secondPlayerButton.addEventListener('click', () => {
    initGame();
    menuSection.classList.add('hide');
    gameboardSection.classList.remove('hide');
  });
  computerPlayerButton.addEventListener('click', () => console.log('Hello from second button!'));
  abortGameButton.addEventListener('click', () => {
    restartGame();
    gameboardSection.classList.add('hide');
    menuSection.classList.remove('hide');
  });
  restartGameButton.addEventListener('click', () => {
    restartGame();
    initGame();
  });
};