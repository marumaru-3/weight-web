import { recordDateSelect } from "../../features/record-date.js";
import {
  initValidateBtn,
  initTextLabelClick,
} from "../../features/form-validate.js";

export const init = () => {
  // 日付選択処理
  recordDateSelect();

  // テキストラベルクリック判定
  initTextLabelClick();

  // バリデーションボタン制御
  initValidateBtn();
  document.addEventListener("input", initValidateBtn);
  document.addEventListener("change", initValidateBtn);

  // フォームの送信処理
  const recordForm = document.getElementById("record-form");
  if (recordForm) {
    recordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("記録フォーム送信");
    });
  }
};
