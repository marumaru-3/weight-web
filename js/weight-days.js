// 日ごとの体重記録用
const weightDaysBlocksParent = document.querySelector(".weight-days__blocks");
const weightDaysBlocks = document.querySelectorAll(".weight-days__block");

// 並び順変更
const weightDaysSwitchBtns = document.querySelectorAll(
  ".weight-days__switch button"
);

const sortWeightDaysBlocks = (isOld) => {
  return [...weightDaysBlocks].sort((a, b) => {
    const aDate = a.querySelector(".weight-days__date").textContent;
    const bDate = b.querySelector(".weight-days__date").textContent;
    if (isOld) {
      return aDate < bDate ? -1 : 1;
    } else {
      return aDate > bDate ? -1 : 1;
    }
  });
};

let isOld = false;
weightDaysBlocksParent.innerHTML = "";
sortWeightDaysBlocks(isOld).forEach((block) =>
  weightDaysBlocksParent.appendChild(block)
);

// 並び順切り替え
weightDaysSwitchBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelector(".weight-days__switch .btn--select")
      ?.classList.remove("btn--select");
    btn.classList.add("btn--select");

    isOld ? (isOld = false) : (isOld = true);
    weightDaysBlocksParent.innerHTML = "";
    sortWeightDaysBlocks(isOld).forEach((block) =>
      weightDaysBlocksParent.appendChild(block)
    );
  });
});

// 体重記録もっと見るボタン
const btnMore = document.querySelector(".weight-days .btn--more");
let showNum = 0;

const moreWeightDays = () => {
  showNum += 6;
  weightDaysBlocks.forEach((block, i) => {
    if (i < showNum) {
      if (!block.classList.contains("show")) block.classList.add("show");
    }
  });

  if (showNum >= weightDaysBlocks.length) {
    btnMore.classList.add("hide");
  }
};
moreWeightDays();

btnMore.addEventListener("click", moreWeightDays);
