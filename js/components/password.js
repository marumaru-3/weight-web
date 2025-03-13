const pwdBtns = document.querySelectorAll(".pwd-btn");

// 本当のパスワード（通常はサーバーから取得する）
const actualPwd = "passwordTest";

let isHidden = true;

pwdBtns.forEach((pwdBtn, i) => {
  pwdBtn.addEventListener("click", () => {
    const pwdValue = pwdBtn.previousElementSibling;

    if (isHidden) {
      console.log(pwdValue.dataset.show);
    }
  });
});
