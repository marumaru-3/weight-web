import {
  initValidateBtn,
  initTextLabelClick,
} from "../../features/form-validate.js";

export const init = () => {
  // テキストラベルクリック判定
  initTextLabelClick();

  // バリデーションボタン制御
  initValidateBtn();

  // フォームの送信処理
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      fetch("/weight-management/index.php?modal=login", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            console.log("ログイン成功なのだ");
          } else {
            console.log("ログイン失敗なのだ");
          }
        })
        .catch((error) => console.log("エラー：", error));
    });
  }
};
