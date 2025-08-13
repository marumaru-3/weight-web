import { fetchResetRecord } from "../../api/fetch-data.js";

export const init = () => {
  // フォームの送信処理
  const recordDelete = document.querySelector(".record-reset");
  if (recordDelete) {
    const resetBtn = document.getElementById("reset-btn");
    resetBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const result = await fetchResetRecord();

      window.history.scrollRestoration = "manual";
      window.location.reload();
      if (!result.success) {
        alert(result.message);
      }
    });
  }
};
