import {
  fetchUserData,
  fetchRecordData,
  fetchModalHtml,
  getDateFromClick,
} from "../api/fetch_data.js";
import { initPwdClick } from "../components/buttons/pwd-btn.js";
import { initPreloadImage } from "../helper.js";

const bodyElement = document.querySelector("body");
const layoutElement = document.getElementById("layout");

// モーダル表示中フラグ
let isModalOpen = false;

// モーダル用キャッシュ
const modalCache = new Map();

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
  let cacheKey = modalType;
  let fetchData = null;

  if (modalType === "recordAdmin" && triggerElem) {
    const date = getDateFromClick(triggerElem);
    if (!date) return;
    cacheKey = `recordAdmin-${date}`;
    fetchData = await fetchRecordData(triggerElem);
  }

  if (modalType === "adminUser") {
    fetchData = await fetchUserData();
  }

  if (modalCache.has(cacheKey)) return;

  const modalHtml = await fetchModalHtml(modalType);
  modalCache.set(cacheKey, { modalHtml, fetchData });
};

// モーダルを開く
const openModal = async (modalType, fetchData, cacheKey = null) => {
  if (isModalOpen) return;
  isModalOpen = true;

  let modalHtml = null;

  if (cacheKey && modalCache.has(cacheKey)) {
    const cached = modalCache.get(cacheKey);
    modalHtml = cached.modalHtml;
    fetchData = cached.fetchData;
  } else {
    modalHtml = await fetchModalHtml(modalType);
  }

  if (modalHtml.success === false) {
    isModalOpen = false;
    return;
  }

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

// モーダルを開くボタンのイベントリスナー
const openModalBtns = document.querySelectorAll("[data-modal]");
openModalBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const modalType = btn.getAttribute("data-modal");
    let fetchData = null;
    let cacheKey = modalType;

    if (modalType === "recordAdmin") {
      const date = getDateFromClick(btn);
      if (date) {
        cacheKey = `recordAdmin-${date}`;
      }
    }

    // キャッシュがある場合はそちらを使う
    if (modalCache.has(cacheKey)) {
      const cached = modalCache.get(cacheKey);
      fetchData = cached.fetchData;
    } else {
      if (modalType === "recordAdmin") {
        fetchData = await fetchRecordData(btn);
      }
      if (modalType === "adminUser") {
        fetchData = await fetchUserData();
      }
    }

    // モーダルを開く前に画像データを読み込み
    if (modalType === "record") {
      initPreloadImage("/images/date-arrow.svg");
    }

    console.log(modalCache);

    openModal(modalType, fetchData, cacheKey);
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

// ページ読み込み直後のプリフェッチ
window.addEventListener("load", () => {
  setTimeout(() => {
    preloadModal("record");
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
