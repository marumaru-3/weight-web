const init = () => {
  const input = document.querySelector(".validate-target");
  input.addEventListener("input", (e) => {
    const target = e.currentTarget;
    console.log(target.validity);
    if (target.validity.valueMissing) {
      alert("値の入力が必須です。");
    } else if (target.validity.tooLong) {
      alert(target.maxlength + "文字まで。");
    } else if (target.validity.petternMismatch) {
      alert("半角英数字で入力してください。");
    }
  });
};

// モーダルを開くボタンのイベントリスナー;
const userBtn = document.querySelector("[data-modal='user-admin']");
userBtn.addEventListener("click", () => {
  setTimeout(() => {
    init();
  }, 50);
});
