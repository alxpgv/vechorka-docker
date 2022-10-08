export const getLink = (
  postSlug: string,
  categorySlug?: string,
  urlPrefix?: string
) => {
  const prefix = urlPrefix ? `/${urlPrefix}` : "";
  return categorySlug
    ? `${prefix}/${categorySlug}/${postSlug}`
    : `${prefix}/${postSlug}`;
};
