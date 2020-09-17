import { getWatchedFilms } from "../utils/utils";

const getMostFrequentWatchedGenre = (watchedFilms) => {
  let counts = {};
  let compare = 0;
  let mostFrequent = ``;

  for (const watchedFilm of watchedFilms) {
    console.log(counts)
    console.log(watchedFilm)
    let film = watchedFilm;
    counts[film] = film in counts ? counts[film] + 1 : 1;

    if (counts[film] > compare) {
      compare = counts[film];
      mostFrequent = watchedFilm;
    }
  }

  return mostFrequent;
};

const getProfileRank = (watchedFilmsAmount) => {
  if (watchedFilmsAmount >= 1 && watchedFilmsAmount <= 10) {
    return `novice`;
  }
  if (watchedFilmsAmount >= 11 && watchedFilmsAmount <= 20) {
    return `fan`;
  }
  return `movie buff`;
};
const generateStatistics = (filmCards) => {
  const watchedFilms = getWatchedFilms(filmCards);
  const watchedFilmsAmount = watchedFilms.length;

  if (watchedFilmsAmount > 0) {

    const watchedFilmsDuration = watchedFilms.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.durationMinutes;
    }, 0);

    const topGenre = getMostFrequentWatchedGenre(watchedFilms.reduce(function (previousValue, currentValue) {
      return previousValue.concat(currentValue.genres);
    }, []));

    const rank = getProfileRank(watchedFilmsAmount);
    return {
      watchedFilmsAmount,
      watchedFilmsDuration,
      topGenre,
      rank,
    };
  }
  return {};
};
export { generateStatistics };
