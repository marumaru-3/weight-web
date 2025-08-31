import { initGetUrl } from "../../helper.js";
import { fetchRegister } from "../../api/api.js";
import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelUI,
} from "../../features/forms/field-validate.js";
import {
  initRestrictToAlphanumeric,
  initRestrictDecimal,
} from "../../features/forms/input-filters.js";
import { initUserDateForm } from "../../features/forms/form-date.js";
import { initStepBtn } from "../../features/forms/form-step.js";

export const init = () => {
  const registerForm = document.getElementById("register-form");

  initUserDateForm();
  initTextLabelUI(registerForm);
  initValidateBtn(registerForm);
  initRestrictToAlphanumeric("input[data-alphanumeric]");
  initRestrictDecimal("input[data-height-input]");
  initRestrictDecimal("input[data-weight-input]");
  initStepBtn();

  // フォームの送信処理
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // バリデーションチェックを実行
      initCheckBtn(registerForm);
      const isValid = initValidateForm(registerForm);

      if (!isValid) {
        console.log("バリデーションエラー： フォーム送信をキャンセル");
        return;
      }

      const formData = new FormData(registerForm);
      const result = await fetchRegister(formData);

      const formMessage = document.querySelector(".form-message");

      if (result.success) {
        // アカウント作成後にフラグをセット
        sessionStorage.setItem("accountCreated", "true");
        window.location.href = initGetUrl("/home");
      } else {
        formMessage.classList.add("error");
        formMessage.innerHTML = `新規登録に失敗しました。<br>${result.errorMessage}`;
        formMessage.style.display = "block";
      }
    });
  }
};
