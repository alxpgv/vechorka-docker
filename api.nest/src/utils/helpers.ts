// eslint-disable-next-line @typescript-eslint/no-var-requires
const PHPUnserialize = require('php-unserialize');

export const unserializeValue = (value: string): string[] | null => {
  return PHPUnserialize.unserialize(value);
};
