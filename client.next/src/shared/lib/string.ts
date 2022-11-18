export const getPhoneFromString = (value: string) => {
  return value ? value.replace(/[^0-9+]/g, "") : "";
};

export const textOverflow = (term: string, limit = 100) => {
  if (term.length <= limit) return term;
  return `${term.slice(0, limit)}...`;
};

export const stripText = (text: string) => {
  text = text.replace(/(<([^>]+)>)/gim, "");
  text = text.replace(/\[.+\]/gim, "");
  text = text.replace(/\t|\s\t/gim, " ");
  text = text.replace(/\r\n/gim, " ");
  text = text.replace(/&nbsp;/gim, " ");
  text = text.replace(/&/gim, "&amp;");
  text = text.replace(/"/gim, "&quot;");
  text = text.replace(/'/gim, "&apos;");
  text = text.replace(/>/gim, "&gt;");
  text = text.replace(/</gim, "&lt;");
  return text.trim();
};
