export const CROSS_CLASS = "x";
export const NAUGHT_CLASS = "o";
export const CROSS_TITLE = "X's turn";
export const NAUGHT_TITLE = "O's turn";
export const DRAW_TITLE = "This is a draw!";
export const WINNER_TITLE = mark => `${mark} is a winner!`;
export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [0, 4, 8],
  [2, 4, 6],
];