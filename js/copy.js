const copyButton = () => {
  // 指定したクラスの要素のテキストを取得
  const element = document.querySelector(".copy__value");

  // テキストをクリップボードにコピー
  navigator.clipboard.writeText(element.textContent);

  console.log("コピーしました。");
};

const copyContents = document.querySelectorAll(".copy-contents");

copyContents.forEach((copy) => {
  copy.addEventListener("click", copyButton);
});
