// ユーザー生年月日用
// 司令塔
export const initUserDateForm = () => {
  const yearSelect = document.getElementById("birth-year");
  const monthSelect = document.getElementById("birth-month");
  const daySelect = document.getElementById("birth-day");

  if (!yearSelect || !monthSelect || !daySelect) return;

  // 年<option>は初回だけ追加
  if (yearSelect.options.length <= 1) {
    // 年の選択肢（現在の年から100年前まで）
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      let option = document.createElement("option");
      option.value = String(i);
      option.textContent = String(i);
      yearSelect.appendChild(option);
    }
  }

  const numOrNull = (v) => (v !== "" && Number.isFinite(+v) ? +v : null);

  // 日の選択肢を更新する関数
  const updateDays = () => {
    const year = numOrNull(yearSelect.value);
    const month = numOrNull(monthSelect.value);
    const prevDay = numOrNull(daySelect.value);

    const state = deriveUserDateState(year, month, prevDay);
    applyUserDateUI({ yearSelect, monthSelect, daySelect }, state);
  };

  // 年 or 月を変更したら、日付を更新
  yearSelect.addEventListener("change", updateDays);
  monthSelect.addEventListener("change", updateDays);

  // 関数呼び出し時に日付を設定
  requestAnimationFrame(updateDays);
};

// 年月＋前回日→状態・maxDay・選択日を算出（純粋ロジック）
const deriveUserDateState = (year, month, prevDay) => {
  const monthDisabled = year == null;
  const dayDisabled = year == null || month == null;

  // 月の最大日数を取得
  let maxDay = null;
  if (!dayDisabled) {
    maxDay = new Date(year, month, 0).getDate();
  }

  // 前に選択した日数を引き継ぐ
  let nextDayValue = null;
  if (prevDay != null && maxDay != null) {
    nextDayValue = Math.min(prevDay, maxDay);
  }

  return { monthDisabled, dayDisabled, maxDay, nextDayValue };
};

// 算出結果をDOM反映：disabled切替・日<option>更新・選択適用
const applyUserDateUI = ({ yearSelect, monthSelect, daySelect }, state) => {
  const { monthDisabled, dayDisabled, maxDay, nextDayValue } = state;

  // 月日の選択制御
  monthSelect.disabled = monthDisabled;
  daySelect.disabled = dayDisabled;

  // 既存のオプションをクリア
  while (daySelect.options.length > 1) {
    daySelect.remove(1);
  }

  // 日のオプションを作成
  if (maxDay != null) {
    for (let i = 1; i <= maxDay; i++) {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = String(i);
      daySelect.appendChild(option);
    }
  }

  // 可能なら選択を適用、なければプレースホルダに戻す
  if (nextDayValue != null) {
    daySelect.value = String(nextDayValue);
    // 年のため存在確認（無ければ最後の日付にする）
    if (daySelect.value !== String(nextDayValue) && maxDay != null) {
      daySelect.value = String(maxDay);
    }
  } else {
    daySelect.value = "";
  }
};
