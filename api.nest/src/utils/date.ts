// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayjs = require('dayjs');

export const formatISODate = (value: string) => {
  return dayjs(value).format('D.MM.YY');
};

export const formatISOTime = (value: string) => {
  return dayjs(value).format('H:mm');
};
