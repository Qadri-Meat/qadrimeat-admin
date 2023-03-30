export default (data) => {
  const formData = new FormData();
  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    if (key === "businessCards") {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else if (String(value) !== "undefined") {
      formData.append(key, value);
    }
  });
  return formData;
};
