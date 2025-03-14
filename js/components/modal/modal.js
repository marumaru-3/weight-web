import { pwdClick } from "../pwd-btn.js";

const bodyElement = document.querySelector("body");
const layoutElement = document.getElementById("layout");

// モーダルを開く
const openModal = (modalType) => {
  fetch(
    `/weight-management/php/components/modal/modal.php?fetch=true&modal=${modalType}`
  )
    .then((response) => response.text())
    .then((html) => {
      layoutElement.insertAdjacentHTML("afterend", html);

      // 背景スクロールさせない
      bodyElement.style.overflow = "hidden";

      // 各モーダルの処理
      initializeModal(modalType);

      // パスワード表示切り替え
      pwdClick();

      // 閉じるボタンのイベントリスナー
      const closeModalBtn = document.getElementById("close-modal");
      if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    })
    .catch((error) => console.error("モーダルの読み込みに失敗:", error));
};

// モーダル削除関数
const closeModal = () => {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove();
    // 背景スクロール
    bodyElement.style.overflow = "";

    // パスワード表示切り替え
    pwdClick();
  }
};
// モーダル背景クリックで閉じる
document.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (modal && e.target === modal) {
    closeModal();
  }
});

// モーダルを開くボタンのイベントリスナー
const openModalBtns = document.querySelectorAll("[data-modal]");
openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalType = btn.getAttribute("data-modal");
    const modal = document.getElementById("modal");
    if (!modal) openModal(modalType);
  });
});

// 各モーダルの処理関数
const initializeModal = (modalType) => {
  switch (modalType) {
    case "record":
      import("./record.js").then((module) => module.init());
      break;
    case "record-admin":
      import("./record.js").then((module) => module.init());
      break;
    case "admin-account":
      import("./user-info.js").then((module) => module.init());
      break;
    case "admin-user":
      import("./user-info.js").then((module) => module.init());
      break;
    case "login":
      import("./login.js").then((module) => module.init());
      break;
    case "signup":
      import("./user-info.js").then((module) => module.init());
      break;
  }
};
