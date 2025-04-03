import {
  fetchUserData,
  fetchRecordData,
  fetchModalHtml,
} from "../api/fetch_data.js";
import { initPwdClick } from "../components/buttons/pwd-btn.js";

const bodyElement = document.querySelector("body");
const layoutElement = document.getElementById("layout");

// モーダル表示中フラグ
let isModalOpen = false;

// モーダルを開く
const openModal = async (modalType, clickElem = null) => {
  if (isModalOpen) {
    return;
  }
  isModalOpen = true;

  // モーダルを開く前にデータを取得
  let fetchData = null;

  if (modalType === "recordAdmin" && clickElem) {
    fetchData = await fetchRecordData(clickElem);
  }

  if (modalType === "adminUser") {
    fetchData = await fetchUserData();
  }

  const modalHtml = await fetchModalHtml(modalType);

  layoutElement.insertAdjacentHTML("afterend", modalHtml);

  // 背景スクロールさせない
  bodyElement.style.overflow = "hidden";

  // 各モーダルの処理
  initializeModal(modalType, fetchData);

  // パスワード表示切り替え
  initPwdClick();

  // 閉じるボタンのイベントリスナー
  const closeModalBtns = document.querySelectorAll(".close-modal");
  closeModalBtns.forEach((btn) => {
    if (btn) btn.addEventListener("click", closeModal);
  });

  isModalOpen = false;
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

// モーダルを開くボタンのイベントリスナー
const openModalBtns = document.querySelectorAll("[data-modal]");
openModalBtns.forEach((btn) => {
  btn.addEventListener("click", (clickElem) => {
    const modalType = btn.getAttribute("data-modal");
    openModal(modalType, clickElem);
  });
});

// モーダル背景クリックで閉じる（recordモーダルのみ）
document.addEventListener("click", (e) => {
  const modalRecord = document.querySelector(
    "#modal.record, #modal.recordAdmin"
  );
  if (modalRecord && e.target === modalRecord) {
    closeModal();
  }
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
    recordAdmin: "./record-admin.js",
    recordReset: "./record-reset.js",
    adminAccount: "./user-info.js",
    adminUser: "./user-info.js",
    login: "./login.js",
    register: "./register.js",
    accountCreated: "./account-created.js",
    accountDelete: "./account-delete.js",
  };

  const modulePath = modalMap[modalType];
  if (modulePath) {
    import(modulePath).then((module) => module.init(recordData));
  }
};
