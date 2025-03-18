// ダイアログ表示
const showDialog = (message) => {
  const dialog = document.createElement("div");
  dialog.textContent = message;
  dialog.classList.add("copy-dialog");

  document.body.appendChild(dialog);

  setTimeout(() => dialog.classList.add("show"), 10);
  setTimeout(() => dialog.classList.remove("show"), 1500);
  setTimeout(() => dialog.remove(), 2000);
};

// コピーボタン用
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("copy-link")) {
    const copyValue = event.target
      .closest(".copy-contents")
      .querySelector(".copy__value");

    if (copyValue) {
      navigator.clipboard.writeText(copyValue.textContent);
      if (!document.querySelector(".copy-dialog"))
        showDialog("IDをコピーしました。");
    }
  }
});
