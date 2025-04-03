import { fetchData } from "./fetch.js";

// Modal html
export const fetchModalHtml = async (modalType) => {
  return fetchData(getUrl(`/index.php?modal=${modalType}`));
};
// / Modal html

// Login data
export const fetchLogin = async (formData) => {
  return fetchData(getUrl("/index.php?modal=login"), "POST", formData);
};
// / Login data

// Register data
export const fetchRegister = async (formData) => {
  return fetchData(getUrl("/index.php?modal=register"), "POST", formData);
};
// / Register data

// Chart data
export const fetchChartData = async () => {
  return fetchData(getUrl("/php/api/chart_data.php"));
};
// / Chart data

// Record data
const getDateFromClick = (clickElem) => {
  const targetElem = clickElem.target.closest("[data-date]");
  if (targetElem) {
    return targetElem.dataset.date;
  }
  return null;
};

export const fetchRecordData = async (clickElem) => {
  const date = getDateFromClick(clickElem);
  if (!date) {
    console.log("日付を取得できませんでした。");
    return { success: false, message: "日付を取得できませんでした。" };
  }
  return fetchData(getUrl(`/php/api/record_data.php?date=${date}`));
};
export const fetchUpdateRecord = async (formData) => {
  return fetchData(getUrl("/index.php?modal=recordAdmin"), "POST", formData);
};
export const fetchInsertRecord = async (formData) => {
  return fetchData(getUrl("/index.php?modal=record"), "POST", formData);
};
export const fetchDeleteRecord = async (formData) => {
  return fetchData(getUrl("/index.php?modal=recordDelete"), "POST", formData);
};
export const fetchResetRecord = async (formData) => {
  return fetchData(getUrl("/index.php?modal=recordReset"), "POST", formData);
};
// / Record data

// User data
export const fetchUserData = async () => {
  return fetchData(getUrl("/php/api/user_data.php"));
};
export const fetchUpdateUser = async (formData) => {
  return fetchData(getUrl("/index.php?modal=adminUser"), "POST", formData);
};
export const fetchUpdateAccount = async (formData) => {
  return fetchData(getUrl("/index.php?modal=adminAccount"), "POST", formData);
};
export const fetchDeleteAccount = async (formData) => {
  return fetchData(getUrl("/index.php?modal=accountDelete"), "POST", formData);
};
// / User data
