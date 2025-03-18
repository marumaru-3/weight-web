// ユーザー生年月日用
export const initUserDateForm = () => {
  const yearSelect = document.getElementById("birth-year");
  const monthSelect = document.getElementById("birth-month");
  const daySelect = document.getElementById("birth-day");

  if (!yearSelect) return;

  // 現在の年を取得
  const currentYear = new Date().getFullYear();

  // 年の選択肢（現在の年から100年前まで）
  for (let i = currentYear; i >= currentYear - 100; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }

  // 日の選択肢を更新する関数
  const updateDays = () => {
    const year = parseInt(yearSelect.value, 10);
    const month = parseInt(monthSelect.value, 10);

    monthSelect.disabled = !year;
    daySelect.disabled = !month;

    if (!month) {
      return;
    }

    // 月ごとの日数を取得
    const daysInMonth = new Date(year, month, 0).getDate();

    // 既存のオプションをクリア
    while (daySelect.options.length > 1) {
      daySelect.remove(1);
    }

    // 日のオプションを作成
    for (let i = 1; i <= daysInMonth; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      daySelect.appendChild(option);
    }
  };

  // 年 or 月を変更したら、日付を更新
  yearSelect.addEventListener("change", updateDays);
  monthSelect.addEventListener("change", updateDays);

  // 関数呼び出し時に日付を設定
  updateDays();
};
