import dayjs from "dayjs";
import "dayjs/locale/ru";

export const formatISODate = (value: string) => {
  return dayjs(value).format("D.MM.YY");
};

export const formatISOTime = (value: string) => {
  return dayjs(value).format("H:mm");
};

export const formatISOToLocaleMonth = (value: number) => {
  return dayjs().month(value).locale("ru").format("MMMM");
};

export const formatISOToLocaleDateMonth = (value: string) => {
  return dayjs(value).locale("ru").format("D MMM");
};
