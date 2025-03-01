const bodyElement = document.querySelector("body");
const layoutElement = document.getElementById("layout");
const openModalBtns = document.querySelectorAll("[data-modal]");

// モーダルを開く
const openModal = (btns) => {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalType = btn.getAttribute("data-modal");
      fetch(
        `/weight-management/php/components/modal/modal.php?fetch=true&modal=${modalType}`
      )
        .then((response) => response.text())
        .then((html) => {
          layoutElement.insertAdjacentHTML("afterend", html);

          const closeModalBtn = document.getElementById("close-modal");
          const recordForm = document.getElementById("record-form");

          // 記録モーダル日付変更対応
          recordDateSelect();

          // アカウント生年月日日付変更対応
          userDateForm();

          // 背景スクロールさせない
          bodyElement.style.overflow = "hidden";

          // モーダルを閉じるボタン
          if (closeModalBtn) {
            closeModalBtn.addEventListener("click", closeModal);
          }

          // フォームの送信処理
          // if (closeModalBtn) {
          //   recordForm.addEventListener("submit", (e) => {
          //     e.preventDefault();
          //     console.log("フォーム送信がブロックされました");
          //   });
          // }
        })
        .catch((error) => console.error("モーダルの読み込みに失敗:", error));
    });
  });
};

openModal(openModalBtns);

const closeModal = () => {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove();
    // 背景スクロール
    bodyElement.style.overflow = "";
  }
};
// モーダル背景クリックで閉じる
document.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (modal && e.target === modal) {
    closeModal();
  }
});
