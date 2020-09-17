import {getFirstLastIndices} from "../utils/utils.js";
import {getRandomInteger} from "./random.js";
const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;
const FilmDescriptionSize = {
  MIN_SENTENCES: 1,
  MAX_SENTENCES: 5,
};
const FilmCommentsRange = {
  MIN_COMMENTS: 0,
  MAX_COMMENTS: 5,
};
const FilmRateRange = {
  MIN_RATE: 1,
  MAX_RATE: 10
};
const CAST_MEMBERS = [`Director`, `Writers`, `Actors`];
const CAST_NAMES = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`];
const AGE_RATINGS = [`+0`, `+8`, `+12`, `+16`, `+18`];
const COUNTRY = `USA`;
const ReleaseYearRange = {
  MIN_YEAR: 1920,
  MAX_YEAR: 2010,
};
const CommentYearRange = {
  MIN_YEAR: 2010,
  MAX_YEAR: 2019,
};
const WatchingDateYearRange = {
  MIN_YEAR: 2010,
  MAX_YEAR: 2019,
};
const MonthRange = {
  MIN_MONTH: 0,
  MAX_MONTH: 11,
};
const TimeRange = {
  MAX_HOUR: 23,
  MIN_HOUR: 0,
  MAX_MINUTE: 59,
  MIN_MINUTE: 0,
};
const DAY_DATE = 1;
const FilmDuration = {
  MAX_MINUTE: 239,
  MIN_MINUTE: 60,
};
const filmTitlePoster = [
  [`Made for Each Other`, `images/posters/made-for-each-other.png`],
  [`Popeye Meets Sinbad`, `images/posters/popeye-meets-sinbad.png`],
  [`Sagebrush Trail`, `images/posters/sagebrush-trail.jpg`],
  [`Santa Claus Conquers the Martians`, `images/posters/santa-claus-conquers-the-martians.jpg`],
  [`The Dance of Life`, `images/posters/the-dance-of-life.jpg`],
  [`The Great Flamarion`, `images/posters/the-great-flamarion.jpg`],
  [`The Man with the Golden Arm`, `images/posters/the-man-with-the-golden-arm.jpg`],
];

const EMOJI_VALUES = [`smile`, `sleeping`, `puke`, `angry`];
const COMMENT_AUTHORS = [`Tim Macoveev`, `John Doe`, `Peter Parker`, `Alice Cooper`, `Tamara Green`];
const COMMENT_TEXT = `Movie's great!`;
const GENRES = [`Musical`, `Comedy`, `Western`, `Mystery`, `Drama`];


const generateDescription = () => {
  const sentences = TEXT.split(`. `);
  const maxSentences = getRandomInteger(FilmDescriptionSize.MIN_SENTENCES, FilmDescriptionSize.MAX_SENTENCES);
  let description = ``;
  for (let i = 0; i < maxSentences; i++) {
    description += `${i === 0 ? `` : ` `}${sentences[getRandomInteger(...getFirstLastIndices(sentences))]}.`;
  }

  return description;
};

const generateRating = () => (
  `${getRandomInteger(FilmRateRange.MIN_RATE, FilmRateRange.MAX_RATE)}.0`
);

const generateGenres = () => {
  const min = 1;
  const max = GENRES.length;
  return GENRES.slice(0, getRandomInteger(min, max));
};


const getRandomDate = (yearRange) => {
  const {MIN_YEAR: minYear, MAX_YEAR: maxYear} = yearRange;
  let dateParameters = [];
  dateParameters.push(getRandomInteger(minYear, maxYear));
  dateParameters.push(getRandomInteger(MonthRange.MIN_MONTH, MonthRange.MAX_MONTH));
  dateParameters.push(DAY_DATE);
  return dateParameters;
};

const getRandomTime = () => {
  let timeParameters = [];
  timeParameters.push(getRandomInteger(TimeRange.MIN_HOUR, TimeRange.MAX_HOUR));
  timeParameters.push(getRandomInteger(TimeRange.MIN_MINUTE, TimeRange.MAX_MINUTE));
  return timeParameters;
};

const generateComments = () => {
  const amount = getRandomInteger(FilmCommentsRange.MIN_COMMENTS, FilmCommentsRange.MAX_COMMENTS);
  if (amount === 0) {
    return [];
  }
  let comments = [];
  for (let i = 0; i < amount; i++) {
    comments.push({
      date: new Date(...[...getRandomDate(CommentYearRange), ...getRandomTime(TimeRange)]),
      emoji: EMOJI_VALUES[getRandomInteger(...getFirstLastIndices(EMOJI_VALUES))],
      author: COMMENT_AUTHORS[getRandomInteger(...getFirstLastIndices(COMMENT_AUTHORS))],
      text: COMMENT_TEXT
    });
  }
  return comments;
};

const generateFilmCard = () => {
  const [title, poster] = filmTitlePoster[getRandomInteger(...getFirstLastIndices(filmTitlePoster))];
  const isWatched = Boolean(getRandomInteger());
  return {
    title,
    poster,
    original: title,
    description: generateDescription(),
    durationMinutes: getRandomInteger(FilmDuration.MAX_MINUTE, FilmDuration.MIN_MINUTE),
    director: CAST_NAMES[getRandomInteger(...getFirstLastIndices(CAST_MEMBERS))],
    writers: CAST_NAMES,
    actors: CAST_NAMES,
    rating: generateRating(),
    ageRating: AGE_RATINGS[getRandomInteger(...getFirstLastIndices(AGE_RATINGS))],
    genres: generateGenres(),
    releaseDate: new Date(...getRandomDate(ReleaseYearRange)),
    country: COUNTRY,
    isWatched,
    watchingDate: isWatched ? new Date(...getRandomDate(WatchingDateYearRange)) : null,
    isFavourite: isWatched ? Boolean(getRandomInteger()) : false,
    isWatchingSoon: isWatched ? false : Boolean(getRandomInteger()),
    comments: generateComments(),
    get commentsAmount() {
      return this.comments.length;
    }
  };
};
export {generateFilmCard};
