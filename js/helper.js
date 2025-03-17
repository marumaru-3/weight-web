const getUrl = (path) => {
  const pathReplace = path.replace(/^\/+/, "");
  return `${BASE_PATH}${pathReplace}`;
};
