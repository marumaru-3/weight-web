export const initPwdClick = () => {
  const pwdBtns = document.querySelectorAll(".pwd-btn");

  if (!pwdBtns.length) return;

  pwdBtns.forEach((pwdBtn) => {
    if (pwdBtn.dataset.inited === "1") return;
    pwdBtn.dataset.inited = "1";

    syncPwdState(pwdBtn);

    pwdBtn.addEventListener("click", () => {
      pwdToggle(pwdBtn);
    });
  });
};

const pwdToggle = (pwdBtn) => {
  const pwdText = getPwdInput(pwdBtn);
  if (!pwdText) return;

  setHidden(pwdBtn, !getHidden(pwdBtn));

  syncPwdState(pwdBtn, pwdText);
};

const getPwdInput = (pwdBtn) => {
  const el = pwdBtn.previousElementSibling;
  return el && el.tagName.toLowerCase() === "input" ? el : null;
};

const setHidden = (pwdBtn, hidden) => (pwdBtn.dataset.hidden = String(hidden));

const getHidden = (pwdBtn) => pwdBtn.dataset.hidden === "true";

const syncPwdState = (pwdBtn, pwdText = getPwdInput(pwdBtn)) => {
  if (!pwdText) return;

  const hidden = getHidden(pwdBtn);

  // input要素表示変更
  pwdText.type = hidden ? "password" : "text";

  // アイコン変更
  const icon = pwdBtn.firstElementChild;
  if (icon) {
    icon.dataset.icon = getHidden(pwdBtn) ? "visibility" : "visibility_off";
  }

  // アクセシビリティ対応
  syncPwdA11y(pwdBtn, pwdText, hidden);
};

const syncPwdA11y = (pwdBtn, pwdText, hidden) => {
  if (pwdText.id) {
    pwdBtn.setAttribute("aria-controls", pwdText.id);
  }
  pwdBtn.setAttribute("aria-pressed", String(!hidden));
  pwdBtn.setAttribute(
    "aria-label",
    hidden ? "パスワードを表示" : "パスワードを非表示"
  );
};
