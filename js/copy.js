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
const copyContents = document.querySelectorAll(".copy-contents");

copyContents.forEach((copy, num) => {
  copy.addEventListener("click", () => {
    const element = document.querySelectorAll(".copy__value");

    // テキストをクリップボードにコピー
    navigator.clipboard.writeText(element[num].textContent);

    showDialog("IDをコピーしました。");
  });
});
