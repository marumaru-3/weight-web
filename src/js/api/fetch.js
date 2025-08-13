import { handleFetchErrorUI } from "./ui-error-handler";

export const fetchData = async (
  url,
  method = "GET",
  body = null,
  options = {}
) => {
  const response = await fetch(url, {
    method,
    body,
    ...options,
  });

  try {
    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    await handleFetchErrorUI(error, response);
    return { success: false, message: "通信エラーが発生しました。" };
  }
};
