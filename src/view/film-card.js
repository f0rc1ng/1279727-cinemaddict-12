import {TIME_MARKS} from "../utils/const.js";
import {humanizeDuration} from "../utils/utils.js";
const DescriptionPreviewValue = {
  MAX_LENGTH: 140,
  LENGTH: 139,
};
const GENRE_MAIN = 0;
const setControl = (isControlActive) => (
  isControlActive ? `film-card__controls-item--active` : ``
);
const createFilmCardTemplate = (filmCard) => {
  const {title, poster, description, durationMinutes, releaseDate, genres, comments, rating, isWatched, isFavourite, isWatchingSoon} = filmCard;
  const descriptionPreview = description.length > DescriptionPreviewValue.MAX_LENGTH ? `${description.slice(0, DescriptionPreviewValue.LENGTH)}...` : description;
  const duration = humanizeDuration(durationMinutes, ...TIME_MARKS);
  const releaseYear = releaseDate.getFullYear();
  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[GENRE_MAIN]}</span>
    </p>
    <img src="${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${descriptionPreview}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setControl(isWatchingSoon)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setControl(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${setControl(isFavourite)}">Mark as favorite</button>
    </form>
  </article>`;
};
export {createFilmCardTemplate};
