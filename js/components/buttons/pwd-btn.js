export const initPwdClick = () => {
  const pwdBtns = document.querySelectorAll(".pwd-btn");

  if (!pwdBtns.length) return;

  // 本当のパスワード（通常はサーバーから取得する）
  const actualPwd = "passwordTest";

  const hiddenPwd = "••••••••••••••";

  pwdBtns.forEach((pwdBtn) => {
    pwdBtn.addEventListener("click", () => {
      const pwdText = pwdBtn.previousElementSibling;
      const pwdTextTag = pwdText.tagName.toLowerCase();
      const pwdBtnChild = pwdBtn.firstElementChild;
      const isHidden = pwdBtn.dataset.hidden === "true";

      // テキスト要素表示変更
      if (pwdTextTag === "input") {
        pwdText.type = isHidden ? "text" : "password";
      } else {
        pwdText.textContent = isHidden ? actualPwd : hiddenPwd;
      }

      // アイコン変更
      if (isHidden) {
        pwdBtnChild.innerHTML = "visibility_off";
      } else {
        pwdBtnChild.innerHTML = "visibility";
      }

      pwdBtn.dataset.hidden = !isHidden;
    });
  });
};
initPwdClick();
