import { initGetUrl } from "../helper.js";
import { fetchData } from "./fetch.js";

// Modal html
export const fetchModalHtml = async (modalType) => {
  return fetchData(initGetUrl(`/index.php?modal=${modalType}`));
};
// / Modal html

// Login data
export const fetchLogin = async (formData) => {
  return fetchData(initGetUrl("/index.php?modal=login"), "POST", formData);
};
// / Login data

// Register data
export const fetchRegister = async (formData) => {
  return fetchData(initGetUrl("/index.php?modal=register"), "POST", formData);
};
// / Register data

// Chart data
export const fetchChartData = async () => {
  return fetchData(initGetUrl("/api/chart_data.php"));
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

let recordCache = {};
export const fetchRecordData = async (clickElem) => {
  const date = getDateFromClick(clickElem);
  if (!date) return null;

  if (recordCache[date]) {
    return recordCache[date];
  }

  const result = await fetchData(
    initGetUrl(`/api/record_data.php?date=${date}`)
  );

  if (result && result.date) {
    recordCache[date] = result;
    return recordCache[date];
  }

  return null;
};
export const fetchUpdateRecord = async (formData) => {
  return fetchData(
    initGetUrl("/index.php?modal=recordAdmin"),
    "POST",
    formData
  );
};
export const fetchInsertRecord = async (formData) => {
  return fetchData(initGetUrl("/index.php?modal=record"), "POST", formData);
};
export const fetchDeleteRecord = async (formData) => {
  return fetchData(
    initGetUrl("/index.php?modal=recordDelete"),
    "POST",
    formData
  );
};
export const fetchResetRecord = async (formData) => {
  return fetchData(
    initGetUrl("/index.php?modal=recordReset"),
    "POST",
    formData
  );
};
// / Record data

// User data
let cachedUserData = null;
export const fetchUserData = async () => {
  if (cachedUserData) return cachedUserData;
  const result = await fetchData(initGetUrl("/api/user_data.php"));

  if (result && result.username) {
    cachedUserData = result;
    return cachedUserData;
  }

  return null;
};
export const fetchUpdateUser = async (formData) => {
  return fetchData(initGetUrl("/index.php?modal=adminUser"), "POST", formData);
};
export const fetchUpdateAccount = async (formData) => {
  return fetchData(
    initGetUrl("/index.php?modal=adminAccount"),
    "POST",
    formData
  );
};
export const fetchDeleteAccount = async (formData) => {
  return fetchData(
    initGetUrl("/index.php?modal=accountDelete"),
    "POST",
    formData
  );
};
// / User data
