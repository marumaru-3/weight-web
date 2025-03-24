export async function fetchChartData() {
  try {
    const response = await fetch(getUrl("/php/api/chart_data.php"), {
      method: "GET",
    });

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
    console.log("エラー：", error);
    throw error;
  }
}
