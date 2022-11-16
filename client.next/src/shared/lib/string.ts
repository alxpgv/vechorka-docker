export const getPhoneFromString = (value: string) => {
  return value ? value.replace(/[^0-9+]/g, "") : "";
};

export const textOverflow = (term: string, limit = 100) => {
  if (term.length <= limit) return term;
  return `${term.slice(0, limit)}...`;
};

export const stripText = (text: string) => {
  text = text.replace(/(<([^>]+)>)/gim, "");
  text = text.replace(/\[.+\]/gi, "");
  text = text.replace(/\t|\s\t/gi, " ");
  text = text.replace(/\r\n/gi, " ");
  text = text.replace(/&nbsp;/gi, " ");
  text = text.replace(/&/gi, "&amp;");
  text = text.replace(/"/gi, "&quot;");
  text = text.replace(/'/gi, "&apos;");
  text = text.replace(/>/gi, "&gt;");
  text = text.replace(/</gi, "&lt;");
  return text;
};
