const layoutElement = document.getElementById("layout");

const openRecordModalBtns = document.querySelectorAll(".modal-record__open");
const openAdminModalBtns = document.querySelectorAll(".modal-admin__open");

// モーダルを開く
const openModal = (openModalBtns) => {
  openModalBtns.forEach((openModalBtn) => {
    openModalBtn.addEventListener("click", () => {
      fetch("/weight-management/php/components/modal/modal.php?fetch=true")
        .then((response) => response.text())
        .then((html) => {
          layoutElement.insertAdjacentHTML("afterend", html);

          const closeModalBtn = document.getElementById("close-modal");
          const recordForm = document.getElementById("record-form");

          // モーダルを閉じるボタン
          if (closeModalBtn) {
            closeModalBtn.addEventListener("click", closeModal);
          }

          // フォームの送信処理
          if (closeModalBtn) {
            recordForm.addEventListener("submit", (e) => {
              e.preventDefault();
              console.log("フォーム送信がブロックされました");
            });
          }
        })
        .catch((error) => console.error("モーダルの読み込みに失敗:", error));
    });
  });
};
openModal(openRecordModalBtns);

// モーダルを閉じる関数
const closeModal = () => {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove();
  }
};
// モーダルコンテンツ以外をクリックしたらモーダルを閉じる
document.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (modal && e.target === modal) {
    closeModal();
  }
});
