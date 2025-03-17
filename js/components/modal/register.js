import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelClick,
  initRestrictToAlphanumeric,
} from "../../features/form-validate.js";
import { initUserDateForm } from "../../features/form-date.js";
import { initStepBtn } from "../../features/form-step.js";

export const init = () => {
  initUserDateForm();
  initTextLabelClick();
  initValidateBtn();
  initRestrictToAlphanumeric("input[data-alphanumeric]");
  initStepBtn();

  // フォームの送信処理
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // バリデーションチェックを実行
      initCheckBtn();
      const isValid = initValidateForm(registerForm);

      if (!isValid) {
        console.log("バリデーションエラー： フォーム送信をキャンセル");
        return;
      }

      const formData = new FormData(this);

      fetch(getUrl("/index.php?modal=register"), {
        method: "POST",
        body: formData,
      })
        // .then((response) => response.text())
        // .then((text) => console.log(JSON.parse(text)));
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            console.log("登録成功なのだ", data.errorMessage);
          } else {
            console.log("登録失敗なのだ", data.errorMessage);
          }
        })
        .catch((error) => console.log("エラー：", error));
    });
  }
};
