import { WINNING_COMBINATIONS } from "../consts/index.js";

export function findRandomEmptyCell(cells) {
  const emptyCells = cells
    .map((cell, index) => (cell === "" ? index : -1))
    .filter(index => index !== -1);

  if (emptyCells.length === 0) return -1;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

export function findWinningMove(cells, mark) {
  for (const combination of WINNING_COMBINATIONS) {
    const filledCells = combination.filter(index => cells[index] === mark);
    const emptyCells = combination.filter(index => cells[index] === "");

    if (filledCells.length === 2 && emptyCells.length === 1) {
      return emptyCells[0];
    }
  }
  return -1;
}
