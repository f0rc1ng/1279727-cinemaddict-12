import {TIME_MARKS} from "../utils/const.js";
import {humanizeDuration} from "../utils/utils.js";

const isStatistics = (statistics) => (
  statistics.constructor === Object && Object.keys(statistics).length > 0
);
const createTotalDurationTemplate = (watchedFilmsDuration) => {
  const timeMarkTemplates = TIME_MARKS.map((timeMark) => `<span class="statistic__item-description">${timeMark}</span>`);
  const totalDurationContentTemplate = humanizeDuration(watchedFilmsDuration, ...timeMarkTemplates);
  return `<p class="statistic__item-text">${totalDurationContentTemplate}</p>`;
};
const createStatisticsRankTemplate = (statistics) => {
  return isStatistics(statistics) ? `<span class="statistic__rank-label">${statistics.rank}</span>` : ``;
};
const createStatisticsListTemplate = (statistics) => {
  if (isStatistics(statistics)) {
    const {watchedFilmsAmount, watchedFilmsDuration, topGenre} = statistics;
    return `<ul class="statistic__text-list">
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">You watched</h4>
         <p class="statistic__item-text">${watchedFilmsAmount} <span class="statistic__item-description">movies</span></p>
       </li>
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">Total duration</h4>
         ${createTotalDurationTemplate(watchedFilmsDuration)}
       </li>
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">Top genre</h4>
         <p class="statistic__item-text">${topGenre}</p>
       </li>
     </ul>`;
  }
  return `<ul class="statistic__text-list">
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">You watched</h4>
         <p class="statistic__item-text">0</p>
       </li>
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">0</p>
       </li>
       <li class="statistic__text-item">
         <h4 class="statistic__item-title">Top genre</h4>
       </li>
     </ul>`;
};

const createStatisticsTemplate = (statistics) => {
  return `<section class="statistic">
     <p class="statistic__rank">
       Your rank
       <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
       ${createStatisticsRankTemplate(statistics)}
     </p>

     <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
       <p class="statistic__filters-description">Show stats:</p>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
       <label for="statistic-all-time" class="statistic__filters-label">All time</label>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
       <label for="statistic-today" class="statistic__filters-label">Today</label>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
       <label for="statistic-week" class="statistic__filters-label">Week</label>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
       <label for="statistic-month" class="statistic__filters-label">Month</label>

       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
       <label for="statistic-year" class="statistic__filters-label">Year</label>
     </form>
      ${createStatisticsListTemplate(statistics)}
     <div class="statistic__chart-wrap">
       <canvas class="statistic__chart" width="1000"></canvas>
     </div>

  </section>`;
};
export {createStatisticsTemplate};
