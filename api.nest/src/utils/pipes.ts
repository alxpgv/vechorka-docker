export const transformToArrayNumber = (value) => {
  const checkArrNumber = (arr) => {
    const arrNumber = [];
    arr.forEach((item) => {
      const number = parseInt(item);
      if (!isNaN(number)) {
        arrNumber.push(number);
      }
    });

    return arrNumber;
  };

  if (typeof value === 'string') {
    const arr = checkArrNumber(value.split(','));
    return arr.length ? arr : value;
  }

  return value;
};
