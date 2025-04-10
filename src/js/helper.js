export const initGetUrl = (path) => {
  const pathReplace = path.replace(/^\/+/, "");
  return `${BASE_PATH}${pathReplace}`;
};

export const initPreloadImage = (url) => {
  const img = new Image();
  img.src = url;
};
