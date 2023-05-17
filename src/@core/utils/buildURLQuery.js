export const buildURLQuery = (obj) => {
  const o = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== '')
  );
  return Object.entries(o)
    .map((pair) => pair.map(encodeURIComponent).join('='))
    .join('&');
};
