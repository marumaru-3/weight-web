const DIALOG_CLASS = "copy-dialog";
const DEFAULT_MESSAGE = "IDをコピーしました。";
const SHOW_DELAY_MS = 10;
const HIDE_AFTER_MS = 1500;
const REMOVE_AFTER_MS = 2000;

export const initCopy = (
  root = document,
  { message = DEFAULT_MESSAGE } = {}
) => {
  const onClick = async (event) => {
    const btn = event.target.closest(".copy-link");
    if (!btn) return;

    const container = btn.closest(".copy-contents");
    const valueEl = container?.querySelector(".copy__value");
    if (!valueEl) return;

    try {
      await navigator.clipboard.writeText(valueEl.textContent);
      if (!root.querySelector(".copy-dialog")) showDialog(message);
    } catch {}
  };

  root.addEventListener("click", onClick);
};

const showDialog = (message) => {
  const dialog = ensureDialog();
  showToast(dialog, message);
};

const ensureDialog = () => {
  let dialog = document.querySelector(`.${DIALOG_CLASS}`);
  if (!dialog) {
    dialog = document.createElement("div");
    dialog.classList.add(DIALOG_CLASS);

    // スクリーンリーダーにコピー完了を通知するための属性
    dialog.setAttribute("role", "status");
    dialog.setAttribute("aria-live", "polite");
    dialog.setAttribute("aria-atomic", "true");
    document.body.appendChild(dialog);
  }

  return dialog;
};

const showToast = (dialog, message) => {
  dialog.textContent = message;

  setTimeout(() => dialog.classList.add("show"), SHOW_DELAY_MS);
  setTimeout(() => dialog.classList.remove("show"), HIDE_AFTER_MS);
  setTimeout(() => dialog.remove(), REMOVE_AFTER_MS);
};
