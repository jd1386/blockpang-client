import moment from 'moment';

const toKoreanTime = originalTime => {
  return moment
    .parseZone(originalTime)
    .utcOffset(9)
    .format('M-DD-YYYY, h:mm:ss a');
};

export default {
  toKoreanTime
};
