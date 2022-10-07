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

export const isDocker = !!Number(process.env.DOCKER);
export const isSSR = typeof window === "undefined";
