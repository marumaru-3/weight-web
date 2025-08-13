export const handleFetchErrorUI = async (error, response) => {
  console.log("通信エラー:", error);

  try {
    const contentType = response?.headers?.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      console.log("サーバーレスポンス:", await response.json());
      alert("モーダルの読み込みに失敗しました。\n" + error.message);
    } else {
      console.log("サーバーレスポンス:", await response.text());
    }
  } catch (parseError) {
    console.error("エラー内容の解析中に失敗しました:", parseError);
  }
};
