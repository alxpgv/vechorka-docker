export const getLink = (
  urlPrefix?: string,
  categorySlug?: string,
  postSlug?: string
) => {
  const _urlPrefix = urlPrefix ? `${urlPrefix}` : "";
  const _postSlug = postSlug ? `/${postSlug}` : "";
  const _categorySlug = categorySlug ? `/${categorySlug}` : "";

  return `/${_urlPrefix}${_categorySlug}${_postSlug}`;
};
