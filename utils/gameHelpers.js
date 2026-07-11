import {
  MARK,
  CLASS_NAME,
  TURN_TYPES,
} from "../consts/index.js";

export function getOppositeMark(mark) {
  return mark === MARK.CROSS ? MARK.NAUGHT : MARK.CROSS;
}

export function getClassName(mark) {
  return mark === MARK.CROSS ? CLASS_NAME[MARK.CROSS] : CLASS_NAME[MARK.NAUGHT];
}

export function getEmptyMark(element) {
  if (isNodeCollection(element)) {
    Array.from(element).forEach(el => clearMarkClasses(el));
    return element;
  }
  clearMarkClasses(element);
  return element;
}

export function getOppositeTurn(turn) {
  return turn === TURN_TYPES.COMPUTER ? TURN_TYPES.PLAYER : TURN_TYPES.COMPUTER;
}

function clearMarkClasses(element) {
  element.classList.remove(getClassName(MARK.CROSS));
  element.classList.remove(getClassName(MARK.NAUGHT));
}

function isNodeCollection(element) {
  const proto = Object.prototype.toString.call(element);
  return proto === "[object NodeList]" || proto === "[object HTMLCollection]";
}
