export async function fetchRecordData(clickElem) {
  try {
    const date = clickElem.target.parentNode.dataset.date;

    const response = await fetch(
      getUrl(`/php/api/record_data.php?date=${date}`),
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        alert("ログインが必要です。");
        window.location.href = getUrl("/welcome");
      }
      throw new Error("APIエラー");
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.log("エラー：", await response.text());
    throw error;
  }
}
