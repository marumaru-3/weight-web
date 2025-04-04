import { fetchDeleteAccount } from "../../api/fetch_data.js";

export const init = () => {
  // フォームの送信処理
  const accountDelete = document.querySelector(".account-delete");
  if (accountDelete) {
    const accDeleteBtn = document.getElementById("acc-delete-btn");
    accDeleteBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const result = await fetchDeleteAccount();

      window.history.scrollRestoration = "manual";
      window.location.reload();
      if (!result.success) {
        alert(result.message);
      }
    });
  }
};
