// 体重を記録モーダル用
export const initRecordDateSelect = () => {
  const dateContents = document.getElementById("date-contents");
  const datePrevBtn = document.getElementById("date-prev");
  const dateNextBtn = document.getElementById("date-next");
  const inputRecordedAt = document.getElementById("recorded_at");

  if (!dateContents && !inputRecordedAt && !datePrevBtn && !dateNextBtn) return;

  const els = { dateContents, inputRecordedAt, dateNextBtn };

  // 今日の日付を取得
  const today = getTodayJST();

  let state = { selectedDate: today, today };

  // 初期描画
  state = deriveRecordDateState(state, "init");
  applyRecordDateUI(els, state);

  // 「前の日」ボタンの処理
  if (datePrevBtn) {
    datePrevBtn.addEventListener("click", () => {
      state = deriveRecordDateState(state, "prev");
      applyRecordDateUI(els, state);
    });
  }

  // 「次の日」ボタンの処理
  if (dateNextBtn) {
    dateNextBtn.addEventListener("click", () => {
      state = deriveRecordDateState(state, "next");
      applyRecordDateUI(els, state);
    });
  }
};

// 今日の日付を取得　YYYY/MM/DD
const getTodayJST = () => {
  const now = new Date();
  const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const dateParts = dateFormatter.formatToParts(now);
  const year = dateParts.find((p) => p.type === "year").value;
  const month = dateParts.find((p) => p.type === "month").value;
  const day = dateParts.find((p) => p.type === "day").value;

  return new Date(`${year}-${month}-${day}T00:00:00+09:00`);
};

// 任意の日付を YYYY/MM/DD に整形
const recordDateDisplay = (date) => {
  const pad = (str) => ("0" + str).slice(-2);

  const year = date.getFullYear().toString();
  const month = pad(date.getMonth() + 1).toString();
  const day = pad(date.getDate()).toString();

  return `${year}/${month}/${day}`;
};

// 純粋ロジック
const deriveRecordDateState = (state, action) => {
  let { today } = state;

  const date = new Date(state.selectedDate);

  if (action === "prev") {
    date.setDate(date.getDate() - 1);
  } else if (action === "next") {
    if (date.getTime() < today.getTime()) {
      date.setDate(date.getDate() + 1);
    }
  }

  const display = recordDateDisplay(date);
  const canGoNext = date.getTime() < today.getTime();

  return { selectedDate: date, today, display, canGoNext };
};

// DOM反映
const applyRecordDateUI = (els, state) => {
  const { dateContents, inputRecordedAt, dateNextBtn } = els;

  if (dateContents) dateContents.textContent = state.display;
  if (inputRecordedAt) inputRecordedAt.value = state.display;
  // 次の日が今日を超えたら無効化
  if (dateNextBtn) dateNextBtn.disabled = !state.canGoNext;
};
