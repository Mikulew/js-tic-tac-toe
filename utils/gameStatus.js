import {
  GAME_TITLE,
  GAME_STATUS,
  GAME_STATUS_TYPES,
  MARK,
} from "../consts/index.js";

export function getTitle(status) {
  return GAME_TITLE[status] ?? GAME_TITLE[GAME_STATUS.CROSS_TURN];
}

export function getGameStatus(mark, type) {
  switch (type) {
    case GAME_STATUS_TYPES.TURN:
      return mark === MARK.CROSS ? GAME_STATUS.CROSS_TURN : GAME_STATUS.NAUGHT_TURN;
    case GAME_STATUS_TYPES.WIN:
      return mark === MARK.CROSS ? GAME_STATUS.CROSS_WINS : GAME_STATUS.NAUGHT_WINS;
    default:
      throw new Error(`Unsupported type argument: ${type}`);
  }
}
