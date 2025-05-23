// ステップでフォームの表示切り替え
export const initStepBtn = () => {
  const classBtnGoToStep2 = document.querySelectorAll(".btn--go-to-step2");
  if (classBtnGoToStep2) {
    document.querySelectorAll(".btn--go-to-step2").forEach((btn) => {
      btn.addEventListener("click", goToStep);
    });
  }
  const idBtnGoToStep2 = document.getElementById("btn--go-to-step2");
  if (idBtnGoToStep2) {
    document
      .getElementById("btn--go-to-step2")
      .addEventListener("click", goToStep);
  }
  document
    .getElementById("btn--back-to-step1")
    .addEventListener("click", backToStep);
};

const goToStep = () => {
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step1").classList.remove("visible");

  document.getElementById("step2").classList.add("visible");
  document.getElementById("step2").classList.remove("hidden");
};

const backToStep = () => {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step2").classList.remove("visible");

  document.getElementById("step1").classList.add("visible");
  document.getElementById("step1").classList.remove("hidden");
};
