import { initUserDateForm } from "../features/forms/form-date.js";
import {
  initValidateBtn,
  initTextLabelClick,
  initRestrictToAlphanumeric,
} from "../features/forms/form-validate.js";

export const init = () => {
  // 日付選択処理
  initUserDateForm();
  // テキストラベルクリック判定
  initTextLabelClick();

  // 半角英数字バリデーション
  initRestrictToAlphanumeric("input[data-alphanumeric]");

  // バリデーションボタン制御
  initValidateBtn();

  // フォームの送信処理
  const userInfoForm = document.querySelector(".basic-info-form");
  if (userInfoForm) {
    userInfoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // inputValidateCheck();
    });
  }
};
