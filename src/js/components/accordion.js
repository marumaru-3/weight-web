export const initAccordion = () => {
  const accordionBtns = document.querySelectorAll(".accordion-btn");

  if (!accordionBtns.length) return;

  accordionBtns.forEach((btn, index) => {
    initA11y(btn, index);
    btn.addEventListener("click", () => toggle(btn));
  });
};

const initA11y = (btn, index) => {
  const accordion = btn.closest(".accordion");
  const content = accordion?.querySelector(".accordion-content");

  if (!accordion || !content) return;

  const btnId = `accordion-btn-${index + 1}`;
  const panelId = `accordion-panel-${index + 1}`;

  btn.id = btnId;
  btn.setAttribute("aria-controls", panelId);
  btn.setAttribute("aria-expanded", "false");

  content.id = panelId;
  content.setAttribute("role", "region");
  content.setAttribute("aria-labelledby", btnId);

  content.hidden = true;
  content.style.maxHeight = "0";
  accordion.setAttribute("data-state", "close");
};

const toggle = (btn) => {
  const accordion = btn.closest(".accordion");
  const content = accordion?.querySelector(".accordion-content");

  if (!accordion || !content) return;

  const isOpen = accordion.getAttribute("data-state") === "open";

  if (isOpen) {
    close(accordion, btn, content);
  } else {
    open(accordion, btn, content);
  }
};

const open = (accordion, btn, content) => {
  content.hidden = false;
  content.style.maxHeight = "0";

  // 開いたときの高さを取得
  requestAnimationFrame(() => {
    content.style.maxHeight = content.scrollHeight + "px";
  });

  btn.setAttribute("aria-expanded", "true");
  accordion.setAttribute("data-state", "open");
};

const close = (accordion, btn, content) => {
  // 一旦現在の高さを設定
  content.style.maxHeight = content.scrollHeight + "px";
  requestAnimationFrame(() => {
    // すぐに0に変更
    content.style.maxHeight = "0";
  });

  const onEnd = (e) => {
    if (e.propertyName === "max-height") {
      content.hidden = true;
      content.removeEventListener("transitionend", onEnd);
    }
  };
  content.addEventListener("transitionend", onEnd);

  btn.setAttribute("aria-expanded", "false");
  accordion.setAttribute("data-state", "close");
};
