export const pick = (object) => {
  const urlSearchParams = new URLSearchParams(object);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
};
