const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const recordForm = document.getElementById("record-form");

const openRecordModalBtns = document.querySelectorAll(".modal-record__open");

// モーダルを開く
const openModal = (openModalBtns) => {
  openModalBtns.forEach((openModalBtn) => {
    openModalBtn.addEventListener("click", function () {
      modal.style.display = "block";
    });
  });
};
openModal(openRecordModalBtns);

// モーダルを閉じる
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
// モーダルコンテンツ以外をクリックしたらモーダルを閉じる
document.addEventListener("click", (e) => {
  if (e.target.closest("#modal") && !e.target.closest(".modal__container")) {
    modal.style.display = "none";
  }
});

// フォームの送信処理
recordForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
