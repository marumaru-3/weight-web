import {
  fetchUserData,
  fetchRecordData,
  fetchModalHtml,
  getDateFromClick,
} from "../api/api.js";
import { initPwdClick } from "../components/buttons/pwd-btn.js";
import { initPreloadImage } from "../helper.js";

const bodyElement = document.querySelector("body");
const layoutElement = document.getElementById("layout");

// モーダル表示中フラグ
let isModalOpen = false;

// モーダル用HTMLキャッシュ
const modalHtmlCache = new Map();
// モーダル用データキャッシュ
const modalDataCache = new Map();

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
    notifications: "./init/notifications.js",
  };

  const modalModules = import.meta.glob("./init/*.js", { eager: true });

  const modulePath = modalMap[modalType];
  const module = modalModules[modulePath];
  if (modulePath && typeof module.init === "function") {
    module.init(recordData);
  }
};

// 事前fetchしてキャッシュする
const preloadModal = async (modalType, triggerElem = null) => {
  const htmlKey = modalType;
  let dataKey = modalType;
  let fetchData = null;

  if (modalType === "recordAdmin" && triggerElem) {
    const date = getDateFromClick(triggerElem);
    if (!date) return;
    dataKey = `recordAdmin-${date}`;
    if (!modalDataCache.has(dataKey)) {
      fetchData = await fetchRecordData(triggerElem);
      modalDataCache.set(dataKey, fetchData);
    }
  }

  if (modalType === "adminUser" && !modalDataCache.has(dataKey)) {
    fetchData = await fetchUserData();
    modalDataCache.set(dataKey, fetchData);
  }

  // 画像データを先読み込み
  if (modalType === "record") {
    initPreloadImage("/images/date-arrow.svg");
  }

  if (modalHtmlCache.has(htmlKey)) return;

  const modalHtml = await fetchModalHtml(modalType);
  modalHtmlCache.set(htmlKey, modalHtml);
};

// モーダルを開く
const openModal = async (modalType, dataKey = null) => {
  if (isModalOpen) return;
  isModalOpen = true;

  const modalHtml =
    modalHtmlCache.get(modalType) || (await fetchModalHtml(modalType));
  const fetchData = dataKey ? modalDataCache.get(dataKey) : null;

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

// モーダル閉じる関数
const closeModal = () => {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove();
    // 背景スクロール
    bodyElement.style.overflow = "";
  }
};

const openModalBtns = document.querySelectorAll("[data-modal]");
// モーダルを開くボタンのイベントリスナー
openModalBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const modalType = btn.getAttribute("data-modal");
    let dataKey = modalType;

    if (modalType === "recordAdmin") {
      const date = getDateFromClick(btn);
      if (date) {
        dataKey = `recordAdmin-${date}`;
      }
    }

    // データキャッシュがなければfetchして保持
    if (!modalDataCache.has(dataKey)) {
      const fetchData = await fetchRecordData(btn);
      modalDataCache.set(dataKey, fetchData);
    }

    openModal(modalType, dataKey);
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

const modalTypesToPreload = new Set();

openModalBtns.forEach((btn) => {
  const modalType = btn.getAttribute("data-modal");
  modalTypesToPreload.add(modalType);
});

// ページ読み込み直後の各モーダルをプリフェッチ
const recordAdminBtns = document.querySelectorAll('[data-modal="recordAdmin"]');
window.addEventListener("load", () => {
  setTimeout(async () => {
    const preloadPromises = [...modalTypesToPreload].map((type) =>
      preloadModal(type)
    );
    await Promise.all(preloadPromises);

    for (const btn of recordAdminBtns) {
      await preloadModal("recordAdmin", btn);
    }
  }, 1000);
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
