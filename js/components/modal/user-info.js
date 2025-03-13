import { userDateForm } from "../../features/form-date.js";
import {
  initValidateBtn,
  initTextLabelClick,
} from "../../features/form-validate.js";

export const init = () => {
  // 日付選択処理
  userDateForm();
  // テキストラベルクリック判定
  initTextLabelClick();

  // バリデーションボタン制御
  initValidateBtn();

  console.log("user-info");

  // フォームの送信処理
  const userInfoForm = document.querySelector(".basic-info-form");
  if (userInfoForm) {
    userInfoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // inputValidateCheck();
    });
  }
};
