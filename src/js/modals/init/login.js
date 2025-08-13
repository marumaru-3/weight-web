import { initGetUrl } from "../../helper.js";
import { fetchLogin } from "../../api/fetch-data.js";
import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelClick,
  initRestrictToAlphanumeric,
  initRestrictToNumeric,
} from "../../features/forms/form-validate.js";

export const init = async () => {
  initTextLabelClick();
  initValidateBtn();
  initRestrictToAlphanumeric("input[data-alphanumeric]");
  initRestrictToNumeric("input[data-numeric]");

  // フォームの送信処理
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // バリデーションチェックを実行
      initCheckBtn();
      const isValid = initValidateForm(loginForm);

      if (!isValid) {
        console.log("バリデーションエラー： フォーム送信をキャンセル");
        return;
      }

      const formData = new FormData(loginForm);
      const result = await fetchLogin(formData);

      const formMessage = document.querySelector(".form-message");

      if (result.success) {
        window.location.href = initGetUrl("/home");
      } else {
        formMessage.classList.add("error");
        formMessage.innerHTML = `ログインに失敗しました。<br>${result.errorMessage}`;
        formMessage.style.display = "block";
      }
    });
  }
};
