export const CROSS_CLASS = "x";
export const NAUGHT_CLASS = "o";
export const MARK = {
  CROSS: "X",
  NAUGHT: "O",
};
export const CLASS_NAME = {
  [MARK.CROSS]: CROSS_CLASS,
  [MARK.NAUGHT]: NAUGHT_CLASS,
};
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
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
];
export const GAME_STATUS = {
  CROSS_TURN: "CROSS_TURN",
  NAUGHT_TURN: "NAUGHT_TURN",
  CROSS_WINS: "CROSS_WINS",
  NAUGHT_WINS: "NAUGHT_WINS",
  DRAW: "DRAW",
};
export const GAME_TITLE = {
  [GAME_STATUS.PLAY]: "Play game!",
  [GAME_STATUS.CROSS_TURN]: `${WINNER_TITLE(MARK.CROSS)}`,
  [GAME_STATUS.NAUGHT_TURN]: `${WINNER_TITLE(MARK.NAUGHT)}`,
  [GAME_STATUS.DRAW]: " This is a draw!",
};
export const HTML_ELEMENTS = {
  MENU_VIEW: "MENU_VIEW",
  GAMEBOARD_VIEW: "GAMEBOARD_VIEW",
  SECOND_PLAYER_BUTTON: "SECOND_PLAYER_BUTTON",
  COMPUTER_PLAYER_BUTTON: "COMPUTER_PLAYER_BUTTON",
  ABORT_GAME_BUTTON: "ABORT_GAME_BUTTON",
  RESTART_GAME_BUTTON: "RESTART_GAME_BUTTON",
  PLAYGROUND: "PLAYGROUND",
  CELLS: "CELLS",
  TITLE: "TITLE",
};