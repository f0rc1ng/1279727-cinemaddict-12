import {getWatchedFilms} from "../utils/utils";
const filmCardToFilterMap = {
  watchlist: (filmCards) => getWatchedFilms(filmCards).length,
  history: (filmCards) => filmCards
    .filter((filmCard) => filmCard.isFavourite).length,
  favorites: (filmCards) => filmCards
    .filter((filmCard) => filmCard.isWatchingSoon).length
};

const generateFilter = (filmCards) => {
  return Object.entries(filmCardToFilterMap).map(([filterName, countFilmCards]) => {
    return {
      name: filterName,
      count: countFilmCards(filmCards),
    };
  });
};
export {generateFilter};
