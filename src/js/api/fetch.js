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
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      console.log(await response.json());
      alert("モーダルの読み込みに失敗しました。\n" + error.message);
    } else {
      console.log(await response.text());
    }
    return { success: false, message: "通信エラーが発生しました。" };
  }
};
