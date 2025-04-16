import { initGetUrl } from "../helper.js";

export const fetchData = async (
  url,
  method = "GET",
  body = null,
  options = {}
) => {
  const response = await fetch(url, {
    method,
    body,
    // credentials: "include",
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
    console.log("エラー:", error);
    console.log("デバッグ:", await response.text());
    return { success: false, message: "通信エラーが発生しました。" };
  }
};
