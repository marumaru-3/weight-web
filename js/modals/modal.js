import { fetchRecordData } from "../api/record_data.js";
import { initPwdClick } from "../components/buttons/pwd-btn.js";

const bodyElement = document.querySelector("body");
const layoutElement = document.getElementById("layout");

// モーダルを開く
const openModal = async (modalType, clickElem = null) => {
  // モーダルを開く前にデータを取得
  let recordData = null;
  if (modalType === "recordAdmin" && clickElem) {
    recordData = await fetchRecordData(clickElem);
  }

  fetch(getUrl(`/index.php?modal=${modalType}`), {
    method: "GET",
  })
    .then((response) => response.text())
    .then((html) => {
      layoutElement.insertAdjacentHTML("afterend", html);

      // 背景スクロールさせない
      bodyElement.style.overflow = "hidden";

      // 各モーダルの処理
      initializeModal(modalType, recordData);

      // パスワード表示切り替え
      initPwdClick();

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
    initPwdClick();
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
  btn.addEventListener("click", (clickElem) => {
    const modalType = btn.getAttribute("data-modal");
    const modal = document.getElementById("modal");
    if (!modal) openModal(modalType, clickElem);
  });
});

// アカウント作成時にID確認モーダルを表示
if (sessionStorage.getItem("accountCreated") === "true") {
  openModal("accountCreated");
  // フラグを削除（再度リロードしたときに表示しないようにする）
  sessionStorage.removeItem("accountCreated");
}

// ログイン成功時・3日ごとにID保存してねモーダルを表示
if (showIdModal) {
  openModal("idCheck");
}

// 各モーダルの処理関数
const initializeModal = (modalType, recordData) => {
  const modalMap = {
    record: "./record.js",
    recordAdmin: "./recordAdmin.js",
    adminAccount: "./user-info.js",
    adminUser: "./user-info.js",
    login: "./login.js",
    register: "./register.js",
    accountCreated: "./account-created.js",
  };

  const modulePath = modalMap[modalType];
  if (modulePath) {
    import(modulePath).then((module) => module.init(recordData));
  }
};
