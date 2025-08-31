import { initValidateBtn } from "../../features/forms/field-validate.js";

export const init = () => {
  const userInfoForm = document.querySelector(".basic-info-form");

  // バリデーションボタン制御
  initValidateBtn(userInfoForm);

  // フォームの送信処理
  if (userInfoForm) {
    userInfoForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
};
