// 体重を記録モーダル用
function recordDateDisplay(date) {
  const pad = (str) => ("0" + str).slice(-2);

  const year = date.getFullYear().toString();
  const month = pad(date.getMonth() + 1).toString();
  const day = pad(date.getDate()).toString();

  return `${year}/${month}/${day}`;
}

function recordDateSelect() {
  const dateContents = document.getElementById("date-contents");
  const datePrevBtn = document.getElementById("date-prev");
  const dateNextBtn = document.getElementById("date-next");

  if (!dateContents) {
    return;
  }

  // 今日の日付を取得
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let selectedDate = new Date(today);

  // 日付を表示する関数
  const updateDateDisplay = () => {
    dateContents.textContent = recordDateDisplay(selectedDate);
    // 次の日が今日を超えたら無効化
    dateNextBtn.disabled = selectedDate.getTime() >= today.getTime();
  };

  // 初期表示
  updateDateDisplay();

  // 「前の日」ボタンの処理
  datePrevBtn.addEventListener("click", () => {
    selectedDate.setDate(selectedDate.getDate() - 1);
    updateDateDisplay();
  });

  // 「次の日」ボタンの処理
  dateNextBtn.addEventListener("click", () => {
    if (selectedDate.getTime() < today.getTime()) {
      selectedDate.setDate(selectedDate.getDate() + 1);
      updateDateDisplay();
    }
  });
}

// ユーザー生年月日用
function userDateForm() {
  const yearSelect = document.getElementById("year");
  const monthSelect = document.getElementById("month");
  const daySelect = document.getElementById("day");

  if (!yearSelect) {
    return;
  }

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
}
