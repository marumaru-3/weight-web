export const fetchData = async (
  url,
  method = "GET",
  body = null,
  options = {}
) => {
  try {
    const response = await fetch(url, {
      method,
      body,
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        alert("ログインが必要です。");
        window.location.href = getUrl("/welcome");
      }
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
    return { success: false, message: "通信エラーが発生しました。" };
  }
};
