// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayjs = require('dayjs');

export const formatDateArray = (startDate, endDate) => {
  return Array.from({
    length: dayjs(endDate).add(1, 'day').diff(dayjs(startDate), 'day'),
  }).map((e, i) => {
    return dayjs(startDate).add(i, 'day').format('YYYY-MM-DD');
  });
};
