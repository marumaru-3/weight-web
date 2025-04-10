import {
  fetchUserData,
  fetchRecordData,
  fetchModalHtml,
} from "../api/fetch_data.js";
import { initPwdClick } from "../components/buttons/pwd-btn.js";
import { initPreloadImage } from "../helper.js";

const bodyElement = document.querySelector("body");
const layoutElement = document.getElementById("layout");

// モーダル表示中フラグ
let isModalOpen = false;

// モーダルを開く
const openModal = async (modalType, fetchData) => {
  if (isModalOpen) {
    return;
  }
  isModalOpen = true;

  const modalHtml = await fetchModalHtml(modalType);

  layoutElement.insertAdjacentHTML("afterend", modalHtml);

  // 背景スクロールさせない
  bodyElement.style.overflow = "hidden";

  // パスワード表示切り替え
  initPwdClick();

  // 各モーダルの処理
  initializeModal(modalType, fetchData);

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
  btn.addEventListener("click", async (clickElem) => {
    const modalType = btn.getAttribute("data-modal");

    // モーダルを開く前にAPIデータを取得
    let fetchData = null;
    if (modalType === "recordAdmin" && clickElem) {
      fetchData = await fetchRecordData(clickElem);
    }
    if (modalType === "adminUser") {
      fetchData = await fetchUserData();
    }

    // モーダルを開く前に画像データを読み込み
    if (modalType === "record") {
      initPreloadImage("/images/date-arrow.svg");
    }

    openModal(modalType, fetchData);
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
    record: "./init/record.js",
    recordAdmin: "./init/record-admin.js",
    recordReset: "./init/record-reset.js",
    adminAccount: "./init/user-info.js",
    adminUser: "./init/user-info.js",
    login: "./init/login.js",
    register: "./init/register.js",
    accountCreated: "./init/account-created.js",
    accountDelete: "./init/account-delete.js",
  };

  const modalModules = import.meta.glob("./init/*.js", { eager: true });

  const modulePath = modalMap[modalType];
  const module = modalModules[modulePath];
  if (modulePath && typeof module.init === "function") {
    module.init(recordData);
  }
};
