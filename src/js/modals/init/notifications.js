import { initStepBtn } from "../../features/forms/form-step.js";

export const init = () => {
  initStepBtn();

  const noticeContents = document.querySelectorAll(".notice-contents");
  const noticeDetails = document.querySelectorAll(".notice-detail");

  const showNoticeDetail = (id) => {
    noticeDetails.forEach((detail) => {
      detail.classList.toggle("visible", detail.id === id);
      detail.classList.toggle("hidden", detail.id !== id);
    });
  };

  noticeContents.forEach((content) => {
    content.addEventListener("click", () => {
      showNoticeDetail(content.dataset.notice);
    });
  });
};
