import dayjs from "dayjs";

export const getPhoneFromString = (value: string) => {
  return value ? value.replace(/[^0-9+]/g, "") : "";
};

export const cutText = (value: string, length = 100) => {
  return value?.length > length ? value.substring(0, length) + "..." : value;
};

// [1,2,3,4,5] to [[1,2,3],[...]] by step
export const createNestedArray = <T>(items: T[], step = 5): Array<T[]> => {
  const groupItems: Array<T[]> = [];
  let groupIndex = 0;

  if (!items || items.length === 0) return [];

  items.forEach((item, index) => {
    if (index % step === 0 && index !== 0) {
      groupIndex++;
    }

    if (groupItems[groupIndex]) {
      groupItems[groupIndex].push(item);
    } else {
      groupItems.push([item]);
    }
  });

  return groupItems;
};

export const getDateFromISO = (value: string) => {
  return dayjs(value).format("D.MM.YY");
};

export const getTimeFromISO = (value: string) => {
  return dayjs(value).format("H:mm");
};

export const encodeQueryData = (params: any) => {
  const url: string[] = [];

  const encodeParams = (params: any) => {
    for (const key in params) {
      if (typeof params[key] === "object") {
        encodeParams(params[key]);
      } else {
        if (typeof params[key] === "boolean") {
          url.push(encodeURIComponent(key) + "=" + Number(params[key]));
        } else {
          url.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        }
      }
    }
  };
  encodeParams(params);
  return url.join("&");
};

export const isSSR = typeof window === "undefined";
