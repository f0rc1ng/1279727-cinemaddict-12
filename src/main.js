import {createFilmCardTemplate} from "./view/film-card.js";
import {createProfileTemplate} from "./view/profile.js";
import {createStatisticsFooterTemplate} from "./view/statistics-footer.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createMainNavigationTemplate} from "./view/mainnavigation.js";
import {createStatisticsItemTemplate} from "./view/statistics-item.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {render} from "./utils/dom.js";
import {generateFilmCard} from "./mock/film-card.js";
import {createFilmsExtraTemplate} from "./view/films-extra.js";
import {findFilmsExtra} from "./mock/films-extra.js";
import {generateFilter} from "./mock/filter.js";
import {generateStatistics} from "./mock/statistics.js";

const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const filmCards = new Array(FILMS_COUNT).fill().map(generateFilmCard);
const extraFilmCards = findFilmsExtra(filmCards);
const filmAmount = filmCards.length;
const filters = generateFilter(filmCards);
const statistics = generateStatistics(filmCards);
const {rank} = statistics;

render(header, createProfileTemplate(rank));
render(main, createMainNavigationTemplate());
const mainNavigation = main.querySelector(`.main-navigation`);
render(mainNavigation, createFilterTemplate(filters));
render(mainNavigation, createStatisticsItemTemplate());
render(main, createSortingTemplate());
render(main, createFilmsTemplate());
const filmsSection = main.querySelector(`.films`);
render(filmsSection, createFilmsListTemplate());
const filmList = filmsSection.querySelector(`.films-list`);
render(filmList, createFilmsContainerTemplate());
const filmListContainer = filmList.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmCards.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmListContainer, createFilmCardTemplate(filmCards[i]));
}

if (filmCards.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCardCount = FILMS_COUNT_PER_STEP;

  render(filmList, createShowMoreButtonTemplate());

  const loadMoreButton = filmList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCardCount, renderedFilmCardCount + FILMS_COUNT_PER_STEP)
      .forEach((filmCard) =>
        render(filmListContainer, createFilmCardTemplate(filmCard))
      );

    renderedFilmCardCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCardCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}
for (const [sectionTitle, extraFilms] of extraFilmCards) {
  if (extraFilms.length > 0) {
    render(filmsSection, createFilmsExtraTemplate(sectionTitle));
    const filmsExtraContainers = filmsSection.querySelectorAll(`.films-list--extra`
    );
    const filmsLastExtraContainer =
      filmsExtraContainers[filmsExtraContainers.length - 1];
    render(filmsLastExtraContainer, createFilmsContainerTemplate());
    const filmExtraListContainer = filmsLastExtraContainer.querySelector(`.films-list__container`
    );
    extraFilms.forEach((extraFilm) =>
      render(filmExtraListContainer, createFilmCardTemplate(extraFilm))
    );
  }
}
render(footer, createStatisticsFooterTemplate(filmAmount));
