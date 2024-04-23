export const isNullOrEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'null'
  );
};

export const isArray = (value) => {
  return Array.isArray(value);
};

export const isObject = (value) => {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );
};

export const isFunction = (value) => {
  return typeof value === 'function';
};

export const isString = (value) => {
  return typeof value === 'string';
};

export const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value);
};

export const getImageUrl = (image) => {
  if (!isNullOrEmpty(image)) {
    return image;
  }
  return '/default.png';
};

export const isValidImages = (files) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // Add more extensions if needed
  files.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    if (!allowedExtensions.includes(fileExtension)) {
      return false;
    }
  });
  return true;
};
