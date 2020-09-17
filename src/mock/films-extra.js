import { getFirstLastIndices } from "../utils/utils.js";
import { getRandomInteger } from "./random.js";
const FIELD_RATE = `rating`;
const FIELD_COMMENTS_AMOUNT = `commentsAmount`;
const MIN_RATING = `0.0`;
const MIN_COMMENTS = 0;
const EXTRA_FILMS_AMOUNT = 2;
const getRandomFilms = (filmCards) => {
  const firstIndexFilm = getRandomInteger(...getFirstLastIndices(filmCards));
  const getExtraFilms = () => {
    const secondIndexFilm = getRandomInteger(...getFirstLastIndices(filmCards));
    if (firstIndexFilm === secondIndexFilm) {
      return getExtraFilms();
    } else {
      return [filmCards[firstIndexFilm], filmCards[secondIndexFilm]];
    }
  };
  return getExtraFilms();
};

const getTopFilms = (filmCards, field) => {
  const setFilms = new Set(filmCards.reduce(function (previousValue, currentValue) {
    previousValue.push(currentValue[field]);
    return previousValue;
  }, []));
  if (setFilms.size === 1) {
    return setFilms.has(MIN_RATING) || setFilms.has(MIN_COMMENTS) ? [] : getRandomFilms(filmCards);
  }
  const filmsSorted = filmCards.sort(function (a, b) {
    return b[field] - a[field];
  });
  return filmsSorted.slice(0, EXTRA_FILMS_AMOUNT);
};

const findFilmsExtra = (filmCards) => {
  return new Map([[`Top rated`, getTopFilms(filmCards, FIELD_RATE)], [`Most commented`, getTopFilms(filmCards, FIELD_COMMENTS_AMOUNT)]]);
};

export { findFilmsExtra };
