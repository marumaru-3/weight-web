// ステップでモーダルの表示切り替え
// 司令塔
export const initStepBtn = () => {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  if (!step1 || !step2) return;

  const nextButtons = document.querySelectorAll(
    ".btn--go-to-step2, #btn--go-to-step2"
  );
  const backBtn = document.getElementById("btn--back-to-step1");

  const onNext = (e) => {
    e.preventDefault();
    goToStep(step1, step2);
  };
  const onPrev = (e) => {
    e.preventDefault();
    backToStep(step1, step2);
  };

  nextButtons.forEach((btn) => btn.addEventListener("click", onNext));
  backBtn.addEventListener("click", onPrev);
};

// 次へ進む（UIのみ）
const goToStep = (step1, step2) => {
  step1.classList.add("hidden");
  step1.classList.remove("visible");

  step2.classList.add("visible");
  step2.classList.remove("hidden");
};

// 前に戻る（UIのみ）
const backToStep = (step1, step2) => {
  step2.classList.add("hidden");
  step2.classList.remove("visible");

  step1.classList.add("visible");
  step1.classList.remove("hidden");
};
