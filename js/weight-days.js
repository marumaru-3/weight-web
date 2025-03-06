const weightDaysSwitchBtns = document.querySelectorAll(
  ".weight-days__switch button"
);
const weightDaysBlocks = document.querySelectorAll(".weight-days__block");

const daysArr = [...weightDaysBlocks].map(
  (block) => block.querySelector(".weight-days__date").textContent
);

// 古い順に並べ替え
daysArr.sort((a, b) => (a < b ? -1 : 1));
// 新しい順に並べ替え
daysArr.sort((a, b) => (a > b ? -1 : 1));

console.log(daysArr);

function sortChange() {}

// 並び順切り替え
weightDaysSwitchBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelector(".weight-days__switch .btn--select")
      ?.classList.remove("btn--select");
    btn.classList.add("btn--select");
  });
});
