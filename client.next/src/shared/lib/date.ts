import dayjs from "dayjs";

export const formatISODate = (value: string) => {
  return dayjs(value).format("D.MM.YY");
};

export const formatISOTime = (value: string) => {
  return dayjs(value).format("H:mm");
};
