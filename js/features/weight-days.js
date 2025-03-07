weightDays();
function weightDays() {
  // 日ごとの体重記録用
  const weightDaysBlocksParent = document.querySelector(".weight-days__blocks");
  const weightDaysBlocks = document.querySelectorAll(".weight-days__block");

  if (!weightDaysBlocksParent) return;

  // 並び順変更関数
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
  // 並び順切り替え 初期値
  let isOld = false;
  weightDaysBlocksParent.innerHTML = "";
  sortWeightDaysBlocks(isOld).forEach((block) =>
    weightDaysBlocksParent.appendChild(block)
  );

  // 体重記録もっと見るボタン
  const btnMore = document.querySelector(".weight-days .btn--more");
  let showNum = 6;

  const moreWeightDays = (blocks) => {
    blocks.forEach((block, i) => {
      if (i < showNum) {
        block.classList.add("show");
      } else {
        if (block.classList.contains("show")) block.classList.remove("show");
      }
    });

    if (showNum >= blocks.length) {
      btnMore.classList.add("hide");
    }
  };
  moreWeightDays(sortWeightDaysBlocks(isOld));

  btnMore.addEventListener("click", () => {
    showNum += 6;
    moreWeightDays(sortWeightDaysBlocks(isOld));
  });

  // 並び順切り替えボタン
  const weightDaysSwitchBtns = document.querySelectorAll(
    ".weight-days__switch button"
  );

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

      moreWeightDays(sortWeightDaysBlocks(isOld));
    });
  });
}
