const MINUTES_IN_HOUR = 60;
const FIRST_INDEX = 0;
const getFirstLastIndices = (items) => (
  [FIRST_INDEX, items.length - 1]
);
const decomposeDuration = (duration) => {
  if (duration < MINUTES_IN_HOUR) {
    return { minute: duration };
  }
  if (!(duration % MINUTES_IN_HOUR)) {
    return { hour: duration / MINUTES_IN_HOUR };
  }
  const minute = duration % MINUTES_IN_HOUR;
  const hour = (duration - minute) / MINUTES_IN_HOUR;
  return { hour, minute };
};

const humanizeDuration = (duration, ...timeMarks) => {
  const [hourMak, minuteMark] = timeMarks;
  const durationDecomposed = decomposeDuration(duration);
  let resultDuration = ``;
  if (durationDecomposed.hour) {
    resultDuration += `${durationDecomposed.hour}${hourMak}`;
  }
  if (durationDecomposed.minute) {
    resultDuration += ` ${durationDecomposed.minute}${minuteMark}`;
  }
  resultDuration = resultDuration.trim();
  return resultDuration;
};
const getWatchedFilms = (filmCards) => {
  return filmCards.filter((filmCard) => filmCard.isWatched);
};

export { humanizeDuration, getFirstLastIndices, getWatchedFilms };
