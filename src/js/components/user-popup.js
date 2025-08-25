export const initUserPopup = () => {
  const popupWrapper = document.getElementById("header__info");
  const popupBtn = document.getElementById("header__profile");
  const popupPanel = document.getElementById("user-popup");

  if (!popupWrapper || !popupBtn || !popupPanel) return;

  initA11y(popupBtn, popupPanel);

  popupBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle(popupWrapper, popupBtn);
  });

  document.addEventListener("click", (e) => {
    if (!popupPanel.contains(e.target)) {
      popupWrapper.classList.remove("click");
      popupBtn.setAttribute("aria-expanded", "false");
    }
  });
};

const initA11y = (popupBtn, popupPanel) => {
  popupBtn.setAttribute("aria-controls", popupPanel.id);
  popupBtn.setAttribute("aria-expanded", "false");
};

const toggle = (popupWrapper, popupBtn) => {
  const isClick = popupWrapper.classList.contains("click");
  isClick ? close(popupWrapper, popupBtn) : open(popupWrapper, popupBtn);
};

const open = (popupWrapper, popupBtn) => {
  popupWrapper.classList.add("click");
  popupBtn.setAttribute("aria-expanded", "true");
};

const close = (popupWrapper, popupBtn) => {
  popupWrapper.classList.remove("click");
  popupBtn.setAttribute("aria-expanded", "false");
};
