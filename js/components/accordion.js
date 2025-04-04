export const initAccordion = () => {
  const accordionBtns = document.querySelectorAll(".accordion-btn");

  if (!accordionBtns) return;

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const accordion = btn.closest(".accordion");
      const content = accordion.querySelector(".accordion-content");
      const isOpen = accordion.getAttribute("data-state") === "open";

      if (isOpen) {
        // 閉じる処理
        // 一旦現在の高さを設定
        content.style.maxHeight = content.scrollHeight + "px";
        requestAnimationFrame(() => {
          // すぐに0に変更
          content.style.maxHeight = "0";
        });

        accordion.setAttribute("data-state", "close");
      } else {
        // 開く処理
        // 開いたときの高さを取得
        content.style.maxHeight = content.scrollHeight + "px";

        accordion.setAttribute("data-state", "open");
      }
    });
  });
};
