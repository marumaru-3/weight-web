import { initValidateBtn } from "../features/forms/form-validate.js";

export const init = () => {
  // バリデーションボタン制御
  initValidateBtn();

  // フォームの送信処理
  const userInfoForm = document.querySelector(".basic-info-form");
  if (userInfoForm) {
    userInfoForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
};
