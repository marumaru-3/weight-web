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

// ダイアログ表示
const showDialog = (message) => {
  const dialog = document.createElement("div");
  dialog.textContent = message;
  dialog.classList.add("copy-dialog");

  document.body.appendChild(dialog);

  setTimeout(() => dialog.classList.add("show"), SHOW_DELAY_MS);
  setTimeout(() => dialog.classList.remove("show"), HIDE_AFTER_MS);
  setTimeout(() => dialog.remove(), REMOVE_AFTER_MS);
};
