export const fetchAPI = async (url, method = "GET", data = null) => {
  try {
    const options = {
      method,
    };

    // データがある場合は body にセット
    if (data) {
      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
        options.headers = { "Content-Type": "application/json" };
      }
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok)
      throw new Error(result.errorMessage || "エラーが発生しました。");

    return result;
  } catch (error) {
    console.error("fetchAPIエラー：", error);
    return { success: false, errorMessage: error.toString() };
  }
};
