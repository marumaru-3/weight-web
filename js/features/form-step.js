// ステップでフォームの表示切り替え
export const initStepBtn = () => {
  document
    .getElementById("btn--go-to-step2")
    .addEventListener("click", goToStep);
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
