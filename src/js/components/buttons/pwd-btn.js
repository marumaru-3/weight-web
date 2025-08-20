const ICON_VISIBLE = "visibility";
const ICON_HIDDEN = "visibility_off";
const LABEL_SHOW = "パスワードを表示";
const LABEL_HIDE = "パスワードを非表示";

export const initPwdClick = () => {
  const pwdBtns = document.querySelectorAll(".pwd-btn");

  if (!pwdBtns.length) return;

  pwdBtns.forEach((pwdBtn) => {
    if (pwdBtn.dataset.inited === "1") return;
    pwdBtn.dataset.inited = "1";

    syncPwdState(pwdBtn);

    const onClick = () => pwdToggle(pwdBtn);
    pwdBtn.addEventListener("click", onClick);
  });
};

const pwdToggle = (pwdBtn) => {
  const input = getPwdInput(pwdBtn);
  if (!input) return;

  setHidden(pwdBtn, !getHidden(pwdBtn));

  syncPwdState(pwdBtn, input);
};

// 前提：ボタン直前に input が存在する
const getPwdInput = (pwdBtn) => {
  const el = pwdBtn.previousElementSibling;
  return el && el.tagName.toLowerCase() === "input" ? el : null;
};

const setHidden = (pwdBtn, hidden) => (pwdBtn.dataset.hidden = String(hidden));

const getHidden = (pwdBtn) => pwdBtn.dataset.hidden === "true";

// data-hidden の値を基準に input / icon / A11y を同期する
const syncPwdState = (pwdBtn, input = getPwdInput(pwdBtn)) => {
  if (!input) return;

  const hidden = getHidden(pwdBtn);

  syncType(input, hidden);
  syncIcon(pwdBtn, hidden);
  syncPwdA11y(pwdBtn, input, hidden);
};

const syncType = (input, hidden) => {
  input.type = hidden ? "password" : "text";
};

const syncIcon = (pwdBtn, hidden) => {
  const icon = pwdBtn.querySelector("[data-icon]");
  if (!icon) return;
  icon.dataset.icon = hidden ? ICON_VISIBLE : ICON_HIDDEN;
};

const syncPwdA11y = (pwdBtn, input, hidden) => {
  if (input.id) pwdBtn.setAttribute("aria-controls", input.id);
  pwdBtn.setAttribute("aria-pressed", String(!hidden));
  pwdBtn.setAttribute("aria-label", labelFor(hidden));
};

const labelFor = (hidden) => (hidden ? LABEL_SHOW : LABEL_HIDE);
