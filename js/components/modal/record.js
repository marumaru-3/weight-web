import { recordDateSelect } from "../../features/record-date.js";

export const init = () => {
  // 日付選択処理
  recordDateSelect();

  // フォームの送信処理
  const recordForm = document.getElementById("record-form");
  if (recordForm) {
    recordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("記録フォーム送信");
    });
  }
};
