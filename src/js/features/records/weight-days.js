// 日ごとの体重記録用
export const initWeightDays = () => {
  const parent = document.querySelector(".weight-days__blocks");
  // もっと見るボタン
  const btnMore = document.querySelector(".weight-days .btn--more");
  // 並び順切り替えボタン
  const switchBtns = [
    ...document.querySelectorAll(".weight-days__switch button"),
  ];
  const els = { parent, btnMore, switchBtns };

  const weightDaysBlocks = [
    ...document.querySelectorAll(".weight-days__block"),
  ];

  if (!parent || !weightDaysBlocks.length) return;

  const blocks = weightDaysBlocks.map((el) => ({
    el,
    dateStr: el.querySelector(".weight-days__date").textContent.trim(),
  }));

  const STEP = 6;
  const state = { sort: "new", showNum: STEP };

  // 初期化
  let view = deriveWeightDaysState(blocks, state);
  applyWeightDaysUI(els, blocks, view);

  // もっと見るボタン
  if (btnMore) {
    btnMore.addEventListener("click", () => {
      state.showNum += STEP;
      view = deriveWeightDaysState(blocks, state);
      applyWeightDaysUI(els, blocks, view);
    });
  }

  // 並び順ボタン
  switchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.sort = btn.dataset.sort === "old" ? "old" : "new";
      view = deriveWeightDaysState(blocks, state);
      applyWeightDaysUI(els, blocks, view);
    });
  });
};

const deriveWeightDaysState = (blocks, state) => {
  const { sort, showNum } = state;
  const getBlock = (i) => blocks[i].dateStr.trim();
  const order = blocks
    .map((_, i) => i)
    .sort((ia, ib) => {
      if (sort === "old") {
        return getBlock(ia).localeCompare(getBlock(ib));
      } else {
        return getBlock(ib).localeCompare(getBlock(ia));
      }
    });

  const visibleCount = Math.min(showNum, blocks.length);
  const canShowMore = visibleCount < blocks.length;

  const selectedSort = sort;

  return { order, visibleCount, canShowMore, selectedSort };
};

const applyWeightDaysUI = (els, blocks, view) => {
  const { parent, btnMore, switchBtns } = els;
  const { order, visibleCount, canShowMore, selectedSort } = view;

  if (!parent) return;

  const frag = new DocumentFragment();

  order.forEach((i, pos) => {
    const el = blocks[i].el;
    if (pos < visibleCount) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
    frag.appendChild(el);
  });
  parent.innerHTML = "";
  parent.appendChild(frag);

  // もっと見るボタン
  if (!canShowMore) {
    btnMore.classList.add("hide");
  }

  // 並び替えボタン
  if (switchBtns && switchBtns.length) {
    switchBtns.forEach((btn) => {
      btn.classList.toggle("btn--select", btn.dataset.sort === selectedSort);
    });
  }
};
