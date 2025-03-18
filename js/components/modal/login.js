import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelClick,
  initRestrictToAlphanumeric,
} from "../../features/forms/form-validate.js";

export const init = () => {
  initTextLabelClick();
  initValidateBtn();
  initRestrictToAlphanumeric("input[data-alphanumeric]");

  // フォームの送信処理
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // バリデーションチェックを実行
      initCheckBtn();
      const isValid = initValidateForm(loginForm);

      if (!isValid) {
        console.log("バリデーションエラー： フォーム送信をキャンセル");
        return;
      }

      const formData = new FormData(this);

      fetch(getUrl("/index.php?modal=login"), {
        method: "POST",
        body: formData,
      })
        // .then((response) => response.text())
        // .then((text) => console.log(JSON.parse(text)));
        .then((response) => response.json())
        .then((data) => {
          const formMessage = document.querySelector(".form-message");

          if (data.success) {
            window.location.href = getUrl("/home");
          } else {
            formMessage.classList.add("error");
            formMessage.innerHTML = `ログインに失敗しました。<br>${data.errorMessage}`;
            formMessage.style.display = "block";
          }
        })
        .catch((error) => console.log("エラー：", error));
    });
  }
};
