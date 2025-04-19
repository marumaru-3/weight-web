export const initPwdClick = async () => {
  const pwdBtns = document.querySelectorAll(".pwd-btn");

  if (!pwdBtns.length) return;

  pwdBtns.forEach((pwdBtn) => {
    pwdBtn.addEventListener("click", () => {
      const pwdText = pwdBtn.previousElementSibling;
      const pwdTextTag = pwdText.tagName.toLowerCase();
      const pwdBtnChild = pwdBtn.firstElementChild;
      const isHidden = pwdBtn.dataset.hidden === "true";

      // input要素表示変更
      if (pwdTextTag === "input") {
        pwdText.type = isHidden ? "text" : "password";
      }

      // アイコン変更
      if (isHidden) {
        pwdBtnChild.dataset.icon = "visibility_off";
      } else {
        pwdBtnChild.dataset.icon = "visibility";
      }

      pwdBtn.dataset.hidden = !isHidden;
    });
  });
};
