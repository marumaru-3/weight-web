import { fetchRegister } from "../api/fetch_data.js";
import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelClick,
  initRestrictToAlphanumeric,
  initRestrictToFloat,
} from "../features/forms/form-validate.js";
import { initUserDateForm } from "../features/forms/form-date.js";
import { initStepBtn } from "../features/forms/form-step.js";

export const init = () => {
  initUserDateForm();
  initTextLabelClick();
  initValidateBtn();
  initRestrictToAlphanumeric("input[data-alphanumeric]");
  initRestrictToFloat("input[data-float]");
  initStepBtn();

  // フォームの送信処理
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // バリデーションチェックを実行
      initCheckBtn();
      const isValid = initValidateForm(registerForm);

      if (!isValid) {
        console.log("バリデーションエラー： フォーム送信をキャンセル");
        return;
      }

      const formData = new FormData(this);
      const result = await fetchRegister(formData);

      const formMessage = document.querySelector(".form-message");

      if (result.success) {
        // アカウント作成後にフラグをセット
        sessionStorage.setItem("accountCreated", "true");
        window.location.href = getUrl("/home");
      } else {
        formMessage.classList.add("error");
        formMessage.innerHTML = `新規登録に失敗しました。<br>${result.errorMessage}`;
        formMessage.style.display = "block";
      }

      // fetch(getUrl("/index.php?modal=register"), {
      //   method: "POST",
      //   body: formData,
      // })
      //   // .then((response) => response.text())
      //   // .then((text) => console.log(JSON.parse(text)));
      //   .then((response) => response.json())
      //   .then((data) => {
      //     const formMessage = document.querySelector(".form-message");

      //     if (data.success) {
      //       // アカウント作成後にフラグをセット
      //       sessionStorage.setItem("accountCreated", "true");
      //       window.location.href = getUrl("/home");
      //     } else {
      //       formMessage.classList.add("error");
      //       formMessage.innerHTML = `新規登録に失敗しました。<br>${data.errorMessage}`;
      //       formMessage.style.display = "block";
      //     }
      //   })
      //   .catch((error) => console.log("エラー：", error));
    });
  }
};
