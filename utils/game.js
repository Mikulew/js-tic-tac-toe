import { CROSS_CLASS, CROSS_TITLE, NAUGHT_CLASS, NAUGHT_TITLE } from "../consts/index.js";

const cellElements = document.querySelectorAll("[data-cell]");
const gameboard = document.querySelector(".gameboard:not(.presentation)");
const title = document.getElementsByClassName("turn-title")[0];
let currentMark = CROSS_CLASS;

export const initGame = () => {
  cellElements.forEach(cellElement => {
    cellElement.addEventListener('click', handleClick, { once: true });
  });
};

function handleClick(e) {
  const cell = e.target;
  changeClass(cell, currentMark);
  changeTitle(getOppositeMark(currentMark));
  changeMark(getOppositeMark(currentMark));
}

function changeMark(newMark) {
  return currentMark = newMark; 
}

function changeTitle(mark) {
  title.textContent = mark === CROSS_CLASS ? CROSS_TITLE : NAUGHT_TITLE;
}

function getOppositeMark(mark) {
  return mark === CROSS_CLASS ? NAUGHT_CLASS : CROSS_CLASS; 
}

function changeClass(cell, mark) {
  cell.classList.add(mark);
  gameboard.classList.remove(mark);
  gameboard.classList.add(getOppositeMark(mark));
}