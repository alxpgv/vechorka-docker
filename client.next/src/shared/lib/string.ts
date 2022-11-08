export const getPhoneFromString = (value: string) => {
  return value ? value.replace(/[^0-9+]/g, "") : "";
};

export function textOverflow(term: string, limit = 100) {
  if (term.length <= limit) return term;
  return `${term.slice(0, limit)}...`;
}
