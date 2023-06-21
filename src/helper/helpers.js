export const isNullOrEmpty = (value) => {
  return (
    value === null || value === undefined || value === "" || value === "null"
  );
};

export const isArray = (value) => {
  return Array.isArray(value);
};

export const isObject = (value) => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

export const isFunction = (value) => {
  return typeof value === "function";
};

export const isString = (value) => {
  return typeof value === "string";
};

export const isNumber = (value) => {
  return typeof value === "number" && isFinite(value);
};

export const getImageUrl = (value) => {
  const image = value.length > 0 ? value[0] : "";
  if (!isNullOrEmpty(image)) {
    return `${process.env.REACT_APP_API_URL}/v1/${image}`;
  }
  return "/default.png";
};
